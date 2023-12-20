<?php

namespace App\Services;

use Illuminate\Http\Request;

class PaymentService
{

    /**
     *
     * func createVNPayPayment
     * @param Request $request
     * create service function for VNPay
     *
     */
    public function createVNPayPayment($request)
    {
        $attributes = $request->all();
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:3000/payment-return";
        $vnp_TmnCode = "BTJGPMO6"; // Mã website tại VNPAY
        $vnp_HashSecret = "PLDPDNGFCDCZORAIXGYVPVLFQODQKYEU"; // Chuỗi bí mật

        // Lấy các thông tin từ request
        $vnp_TxnRef = rand(1, 10000000);
        $vnp_OrderInfo = $attributes['vnp_OrderInfo'];
        $vnp_Amount = $attributes['vnp_Amount'] * 100;
        $vnp_Amount = $attributes['vnp_Amount'] * 100;
        $vnp_OrderType = $attributes['vnp_OrderType'];

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
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_Locale" => "vn"
            // Thêm các thông tin khác...
        );


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
            header('Location: ' . $vnp_Url);
            die();
            // return response()->json([
            //     'url' => $vnp_Url
            // ]);
        } else {
            echo json_encode($returnData);
        }
    }
}
