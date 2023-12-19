<?php

namespace App\Http\Controllers\API\V1;

use App\Events\SeatReservation;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Seat;
use App\Services\PaymentService;
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

            foreach($request->seats as $seat) {
                $seatModel = Seat::query()->find($seat['id']);

                if($seatModel->status == Seat::BOOKED) {
                    return response()->json([
                        'message' => 'Ghế đã được đặt'
                    ], Response::HTTP_BAD_REQUEST);
                }
            }

            $booking = Booking::create([
                'user_id' => $request->user_id,
                'booking_id' => $request->booking_id,
                'showtime_id' => $request->showtime_id,
                'total_price' => $request->total_price
            ]);

            foreach ($request->products as $product) {
                $booking->products()->attach($product['id'], ['quantity' => $product['quantity']]);
            }

            foreach ($request->seats as $seat) {
                $seatModel = Seat::query()->find($seat['id']);

                $seatModel->update([
                    'status' => Seat::BOOKED,
                    'booking_id' => $booking->id
                ]);
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
        //     $attributes = $request->all();
        //     $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        //     $vnp_Returnurl = "https://localhost:3000";
        //     $vnp_TmnCode = "X1GKNVAH"; // Mã website tại VNPAY
        //     $vnp_HashSecret = "ZXMKHTLSNZBCXLMVFJEQNBIDIRCUMYRC"; // Chuỗi bí mật

        //     // Lấy các thông tin từ request
        //     $vnp_TxnRef = rand(1, 10000000);
        //     $vnp_OrderInfo = $attributes['vnp_OrderInfo'];
        //     $vnp_Amount = $attributes['total_price'] * 100;
        //     $vnp_BankCode = $attributes['bank_code'];

        //     // Các thông tin khác cần thiết...

        //     $inputData = array(
        //         "vnp_Version" => "2.1.0",
        //         "vnp_TmnCode" => $vnp_TmnCode,
        //         "vnp_Amount" => $vnp_Amount,
        //         "vnp_Command" => "pay",
        //         "vnp_CreateDate" => date('YmdHis'),
        //         "vnp_CurrCode" => "VND",
        //         "vnp_IpAddr" => $_SERVER['REMOTE_ADDR'],
        //         "vnp_OrderInfo" => $vnp_OrderInfo,
        //         "vnp_ReturnUrl" => $vnp_Returnurl,
        //         "vnp_TxnRef" => $vnp_TxnRef,
        //         "vnp_OrderType" => "billpayment",
        //         "vnp_Locale" => "vn"
        //         // Thêm các thông tin khác...
        //     );

        //     if (isset($vnp_BankCode) && $vnp_BankCode != "") {
        //         $inputData['vnp_BankCode'] = $vnp_BankCode;
        //     }

        //     ksort($inputData);
        //     $query = "";
        //     $i = 0;
        //     $hashdata = "";

        //     foreach ($inputData as $key => $value) {
        //         if ($i == 1) {
        //             $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
        //         } else {
        //             $hashdata .= urlencode($key) . "=" . urlencode($value);
        //             $i = 1;
        //         }
        //         $query .= urlencode($key) . "=" . urlencode($value) . '&';
        //     }

        //     $vnp_Url = $vnp_Url . "?" . $query;
        //     if (isset($vnp_HashSecret)) {
        //         $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
        //         $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        //     }

        //     $returnData = array(
        //         'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        //     );

        //     if (isset($attributes['redirect'])) {
        //         // header('Location: ' . $vnp_Url);
        //         // die();
        //         return response()->json([
        //             'url' => $vnp_Url
        //         ]);
        //     } else {
        //         echo json_encode($returnData);
        //     }
        // }
    }

    public function updateSeatReservation(Request $request, string $id)
    {
        try {
            $seat = Seat::query()->find($id);

            $seat->update([
                'status' => $request->status,
                'user_id' => $request->user_id
            ]);

            // event(new SeatReservation($seat));

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
