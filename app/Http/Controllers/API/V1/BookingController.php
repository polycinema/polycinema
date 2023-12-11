<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Seat;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{

    /**
     *
     * @param Request $request
     * store booking value
     *
     */

    public function store(Request $request)
    {
        try {
            $booking = Booking::create([
                'user_id' => $request->user_id,
                'showtime_id' => $request->showtime_id,
                'total_price' => $request->total_price
            ]);

            $products = [];

            foreach ($request->products as $product) {
                $booking->products()->attach($product['id'], ['quantity' => $product['quantity']]);
            }

            $booking->products()->attach($products);

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
            ]);
        } catch (Exception $exception) {
            Log::error('BookingController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // public function createVNPayPayment(Request $request)
    // {
    //     $attributes = $request->all();
    //     $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    //     $vnp_Returnurl = "https://localhost/vnpay_php/vnpay_return.php";
    //     $vnp_TmnCode = "X1GKNVAH"; //Mã website tại VNPAY
    //     $vnp_HashSecret = "ZXMKHTLSNZBCXLMVFJEQNBIDIRCUMYRC"; //Chuỗi bí mật

    //     $vnp_TxnRef = $_POST['order_id']; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
    //     $vnp_OrderInfo = $_POST['order_desc'];
    //     $vnp_OrderType = $_POST['order_type'];
    //     $vnp_Amount = $_POST['total_price'] * 100;
    //     // $vnp_Locale = $_POST['language'];
    //     $vnp_BankCode = $_POST['bank_code'];
    //     $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
    //     //Add Params of 2.0.1 Version
    //     $vnp_ExpireDate = $_POST['txtexpire'];
    //     //Billing
    //     $vnp_Bill_Mobile = $_POST['txt_billing_mobile'];
    //     $vnp_Bill_Email = $_POST['txt_billing_email'];
    //     // $fullName = trim($_POST['txt_billing_fullname']);
    //     // if (isset($fullName) && trim($fullName) != '') {
    //     //     $name = explode(' ', $fullName);
    //     //     $vnp_Bill_FirstName = array_shift($name);
    //     //     $vnp_Bill_LastName = array_pop($name);
    //     // }
    //     // $vnp_Bill_Address = $_POST['txt_inv_addr1'];
    //     // $vnp_Bill_City = $_POST['txt_bill_city'];
    //     // $vnp_Bill_Country = $_POST['txt_bill_country'];
    //     // $vnp_Bill_State = $_POST['txt_bill_state'];
    //     // Invoice
    //     // $vnp_Inv_Phone = $_POST['txt_inv_mobile'];
    //     // $vnp_Inv_Email = $_POST['txt_inv_email'];
    //     // $vnp_Inv_Customer = $_POST['txt_inv_customer'];
    //     // $vnp_Inv_Address = $_POST['txt_inv_addr1'];
    //     // $vnp_Inv_Company = $_POST['txt_inv_company'];
    //     // $vnp_Inv_Taxcode = $_POST['txt_inv_taxcode'];
    //     // $vnp_Inv_Type = $_POST['cbo_inv_type'];
    //     $inputData = array(
    //         "vnp_Version" => "2.1.0",
    //         "vnp_TmnCode" => $vnp_TmnCode,
    //         "vnp_Amount" => $vnp_Amount,
    //         "vnp_Command" => "pay",
    //         "vnp_CreateDate" => date('YmdHis'),
    //         "vnp_CurrCode" => "VND",
    //         "vnp_IpAddr" => $vnp_IpAddr,
    //         // "vnp_Locale" => $vnp_Locale,
    //         "vnp_OrderInfo" => $vnp_OrderInfo,
    //         // "vnp_OrderType" => $vnp_OrderType,
    //         "vnp_ReturnUrl" => $vnp_Returnurl,
    //         // "vnp_TxnRef" => $vnp_TxnRef,
    //         // "vnp_ExpireDate" => $vnp_ExpireDate,
    //         // "vnp_Bill_Mobile" => $vnp_Bill_Mobile,
    //         // "vnp_Bill_Email" => $vnp_Bill_Email,
    //         // "vnp_Bill_FirstName" => $vnp_Bill_FirstName,
    //         // "vnp_Bill_LastName" => $vnp_Bill_LastName,
    //         // "vnp_Bill_Address" => $vnp_Bill_Address,
    //         // "vnp_Bill_City" => $vnp_Bill_City,
    //         // "vnp_Bill_Country" => $vnp_Bill_Country,
    //         // "vnp_Inv_Phone" => $vnp_Inv_Phone,
    //         // "vnp_Inv_Email" => $vnp_Inv_Email,
    //         // "vnp_Inv_Customer" => $vnp_Inv_Customer,
    //         // "vnp_Inv_Address" => $vnp_Inv_Address,
    //         // "vnp_Inv_Company" => $vnp_Inv_Company,
    //         // "vnp_Inv_Taxcode" => $vnp_Inv_Taxcode,
    //         // "vnp_Inv_Type" => $vnp_Inv_Type
    //     );

    //     if (isset($vnp_BankCode) && $vnp_BankCode != "") {
    //         $inputData['vnp_BankCode'] = $vnp_BankCode;
    //     }
    //     if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
    //         $inputData['vnp_Bill_State'] = $vnp_Bill_State;
    //     }

    //     //var_dump($inputData);
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
    //         $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //
    //         $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
    //     }
    //     $returnData = array(
    //         'code' => '00', 'message' => 'success', 'data' => $vnp_Url
    //     );
    //     if (isset($_POST['redirect'])) {
    //         // header('Location: ' . $vnp_Url);
    //         // die();

    //         return response()->json([
    //             'url' => $vnp_Url
    //         ]);
    //     } else {
    //         echo json_encode($returnData);
    //     }
    // }

    public function createVNPayPayment(Request $request)
    {
        $attributes = $request->all();
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "https://localhost/vnpay_php/vnpay_return.php";
        $vnp_TmnCode = "X1GKNVAH"; // Mã website tại VNPAY
        $vnp_HashSecret = "ZXMKHTLSNZBCXLMVFJEQNBIDIRCUMYRC"; // Chuỗi bí mật

        // Lấy các thông tin từ request
        $vnp_TxnRef = rand(00, 9999);
        $vnp_OrderInfo = $attributes['order_desc'];
        $vnp_Amount = $attributes['total_price'] * 100;
        $vnp_BankCode = $attributes['bank_code'];

        // Các thông tin khác cần thiết...

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $_SERVER['REMOTE_ADDR'],
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            // Thêm các thông tin khác...
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";

        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        $returnData = array(
            'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        );

        if (isset($attributes['redirect'])) {
            return response()->json([
                'url' => $vnp_Url
            ]);
        } else {
            echo json_encode($returnData);
        }
    }
}
