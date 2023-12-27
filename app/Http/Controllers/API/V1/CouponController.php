<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\CouponBooking;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function checkUserCanUseCoupon()
    {
    }

    public function userUsingCoupon(Request $request)
    {   
        // POST Request user_id, coupon_id
        try {
            $coupon_booking = new CouponBooking();

            $coupon_booking->fill($request->all());

            $coupon_booking->save();

            return response()->json([
                'data' => $coupon_booking,
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/CounponController@userUsingCoupon:, '[$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAvailableCouponsByUser(Request $request)
    {
        // Lấy tất cả các Coupon còn hạn sủ dụng và còn số lượng theo user_id
        // POST Request user_id 
        try {
            $coupons = Coupon::query()->where('expires_at', '>=', now())
                ->where('quantity', '>', 0)
                ->get();

            $used_coupons = CouponBooking::query()->where('user_id', $request->user_id)->with('coupon')->get();

            $usedCouponIds = [];

            foreach ($used_coupons as $usedCoupon) {
                $usedCouponIds[] = $usedCoupon['coupon_id'];
            }

            $myAvailableCoupons = array_filter($coupons->toArray(), function ($coupon) use ($usedCouponIds) {
                return !in_array($coupon['id'], $usedCouponIds);
            });

            // Chuyển đổi từ key:value thành dạng mảng 
            $myAvailableCoupons = array_values($myAvailableCoupons);

            return response()->json([
                'data' => $myAvailableCoupons,
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/CounponController@getAvailableCouponsByUser:, '[$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
