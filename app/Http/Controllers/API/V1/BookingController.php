<?php

namespace App\Http\Controllers\API\V1;

use App\Events\SeatReservation;
use App\Http\Controllers\Controller;
use App\Mail\BookingInformationMail;
use App\Models\Booking;
use App\Models\Coupon;
use App\Models\CouponBooking;
use App\Models\Seat;
use App\Models\User;
use App\Services\PaymentService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class BookingController extends Controller
{

    public $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index()
    {
        try {
            $bookings = Booking::query()->get();

            $bookings_show = Booking::query()->where('level', 'show')
                ->with('user')
                ->with('showtime.movie')
                ->with(['products' => function ($query) {
                    $query->withPivot('quantity');
                }])
                ->with(['seats.showtime.room'])
                ->orderBy('created_at', 'desc')
                ->get();

            $total_bookings = $bookings->count();
            $not_yets = $bookings->where('level', 'show')->where('status', Booking::NOT_YET)->count();
            $satisfieds = $bookings->where('status', Booking::SATISFIED)->count();
            $bookings_hide = Booking::query()->where('level', Booking::LEVEL_HIDE)->count();
            $cancel = Booking::query()->where('status', 'cancel')->count();

            $data = [
                'bookings' => $bookings_show,
                'total_bookings' => $total_bookings,
                'not_yet' => $not_yets,
                'satisfieds' => $satisfieds,
                'hide' => $bookings_hide,
                'cancel' => $cancel
            ];

            return response()->json([
                'data' => $data
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @param Request $request
     * store booking value
     *
     */

    public function store(Request $request)
    {
        // POST : booking_id, user_id, showtime_id, total_price, coupon_code, seats, products
        try {
            // Tạo Booking
            $booking = Booking::create([
                'user_id' => $request->user_id,
                'booking_id' => $request->booking_id,
                'showtime_id' => $request->showtime_id,
                'total_price' => $request->total_price,
                'coupon_code' => $request->coupon_code
            ]);

            if ($request->coupon_code) {

                $coupon = Coupon::query()->where('coupon_code', $request->coupon_code)->first();

                $coupon_user = CouponBooking::create([
                    'coupon_id' => $coupon->id,
                    'user_id' => $request->user_id,
                ]);
                // Trừ 1 số lượng mã giảm giá
                $coupon->quantity = $coupon->quantity - 1;
                $coupon->save();
            }


            foreach ($request->products as $product) {
                $booking->products()->attach($product['id'], ['quantity' => $product['quantity']]);
            }

            // Update trạng thái ghế
            foreach ($request->seats as $seat) {
                $seatModel = Seat::query()->find($seat['id']);

                $seatModel->update([
                    'status' => Seat::BOOKED,
                    'booking_id' => $booking->id,
                    'user_id' => $request->user_id
                ]);
                event(new SeatReservation($seatModel));
            }

            Mail::to($booking->user->email)->send(new BookingInformationMail($booking));

            return response()->json([
                'data' => $booking,
                'message' => 'Đặt vé thành công'
            ], Response::HTTP_CREATED);
        } catch (Exception $exception) {
            Log::error('BookingController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function createVNPayPayment(Request $request)
    {
        return $this->paymentService->createVNPayPayment($request);
    }

    public function updateSeatReservation(Request $request, string $id)
    {
        try {
            $seat = Seat::query()->find($id);

            $seat->update([
                'status' => $request->status,
                'user_id' => $request->user_id
            ]);


            event(new SeatReservation($seat));


            return response()->json([
                'message' => 'Đã cập nhật thành công'
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@updateSeatReservation: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Chuyển đổi trạng thái đơn hàng từ chưa NOT_YET => SATISFIED
    public function setStatusBookingToSatisfied(string $id)
    {
        try {
            $booking = Booking::find($id);

            $booking->status = Booking::SATISFIED;

            $booking->save();

            return response()->json([
                'message' => $booking
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@setStatusBookingToSatisfied: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Chuyển đổi trạng thái đơn hàng từ đã SATISFIED => NOT_YET
    public function setStatusBookingToNotYet(string $id)
    {
        try {
            $booking = Booking::find($id);

            $booking->status = Booking::NOT_YET;

            $booking->save();

            return response()->json([
                'message' => " Cập nhật thành công đơn $booking->booking_id "
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@setStatusBookingToNotYet: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @var string $id
     *
     */

    public function show(string $id)
    {
        try {
            $booking = Booking::query()
                ->with('user')
                ->with('showtime.movie')
                ->with(['products' => function ($query) {
                    $query->withPivot('quantity');
                }])
                ->with(['seats.showtime.room'])
                ->find($id);

            return response()->json([
                'data' => $booking
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function bookingsByUser(string $userId)
    {
        try {
            $bookings = Booking::query()
                ->with('user')
                ->with('showtime.movie')
                ->with(['products' => function ($query) {
                    $query->withPivot('quantity');
                }])
                ->with(['seats.showtime.room'])
                ->where('user_id', $userId)
                ->get();

            return response()->json([
                'data' => $bookings
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@bookingsByUser: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    // Ẩn hiện booking theo id index bẳng bookings
    public function changeLevelBooking(Request $request)
    {
        try {
            $booking = Booking::find($request->booking_id);

            $level_booking = $booking->level;

            switch ($level_booking) {
                case Booking::LEVEL_HIDE:
                    $booking->level = Booking::LEVEL_SHOW;
                    $message = "Đã khôi phục đơn $booking->booking_id";
                    break;
                case Booking::LEVEL_SHOW:
                    $booking->level = Booking::LEVEL_HIDE;
                    $message = "Đã thêm đơn $booking->booking_id vào thùng rác";
                    break;
            }

            $booking->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@changeLevelBooking: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Search Booking by booking_id (cái mã đơn hàng chứ không phải id bảng booking)
    public function findBookingByBookingID(Request $request)
    {
        try {
            $booking_id = $request->booking_id;

            $booking = Booking::query()->where('booking_id', $booking_id)
                ->with('seats', 'products', 'showtime', 'user')
                ->first();

            return response()->json([
                'data' => $booking
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@findBookingByBookingID: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getBookingInTrash()
    {
        try {
            $bookings = Booking::query()->where('level', 'hide')
                ->with('user')
                ->with('showtime.movie')
                ->with(['products' => function ($query) {
                    $query->withPivot('quantity');
                }])
                ->with(['seats.showtime.room'])
                ->get();

            return response()->json([
                'data' => $bookings
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getBookingByBookingID(string $booking_id)
    {
        try {
            $booking = Booking::query()->where('booking_id', $booking_id)
                ->with('showtime')
                ->with('products')
                ->with('seats')
                ->first();

            return response()->json([
                'data' => $booking
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@getBookingByBookingID: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function doCancelBooking(string $id)
    {
        try {
            $booking = Booking::find($id);

            $booking->status = Booking::CANCEL;
            $booking->level = Booking::LEVEL_HIDE;
            $booking->save();

            return response()->json([
                'message' => $booking
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@changeLevelBooking: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
