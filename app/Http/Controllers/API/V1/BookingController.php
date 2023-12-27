<?php

namespace App\Http\Controllers\API\V1;

use App\Events\SeatReservation;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Coupon;
use App\Models\Seat;
use App\Services\PaymentService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

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
            $bookings = Booking::query()
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

    /**
     *
     * @param Request $request
     * store booking value
     *
     */

    public function store(Request $request)
    {
        try {

            // foreach($request->seats as $seat) {
            //     $seatModel = Seat::query()->find($seat['id']);

            //     if($seatModel->status == Seat::BOOKED) {
            //         return response()->json([
            //             'message' => 'Ghế đã được đặt'
            //         ], Response::HTTP_BAD_REQUEST);
            //     }
            // }

            // Tạo Booking
            $booking = Booking::create([
                'user_id' => $request->user_id,
                'booking_id' => $request->booking_id,
                'showtime_id' => $request->showtime_id,
                'total_price' => $request->total_price,
                'coupon_code' => $request->coupon_code
            ]);

            foreach ($request->products as $product) {
                $booking->products()->attach($product['id'], ['quantity' => $product['quantity']]);
            }

            // Update trạng thái ghế 
            foreach ($request->seats as $seat) {
                $seatModel = Seat::query()->find($seat['id']);

                $seatModel->update([
                    'status' => Seat::BOOKED,
                    'booking_id' => $booking->id
                ]);

            event(new SeatReservation($seatModel));

            }
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
}
