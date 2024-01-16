<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $coupons = Coupon::query()->where('level','show')->get();

            return response()->json([
                'data' => $coupons
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/CouponController@index: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'coupon_code' => 'required|string|unique:coupons',
                'description' => 'required|string',
                'type' => ['required', Rule::in(['discount_percentage', 'discount_amount'])],
                'discount' => [
                    'required',
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->type === 'discount_percentage') {
                            if ($value <= 0 || $value >= 100) {
                                $fail('Phần Trăm Không Được Nhỏ Hơn 0 Hoặc Lớn Hơn 100');
                            }
                        } elseif ($request->type === 'discount_amount') {
                            if (!is_numeric($value)) {
                                $fail('Số Tiền Giảm Giá Phải Là Số Nguyên');
                            }
                        }
                    },
                ],
                'start_at' => 'required|date',
                'expires_at' => 'required|date',
                'quantity' => 'required|numeric|min:0',
                'min_order_value' => 'nullable|numeric|min:0'
            ], [
                'coupon_code.required' => 'Trường Mã Giảm Giá Không Được Trống',
                'coupon_code.string' => 'Trường Mã Giảm Giá Phải Là Một Chuỗi',
                'coupon_code.unique' => 'Mã Giảm Giá Đã Tồn Tại',
                'description.required' => 'Trường Mô Tả Mã Giảm Giá Không Được Trống',
                'description.string' => 'Trường Mô Tả Mã Giảm Giá Phải Là Một Chuỗi',
                'type.required' => 'Trường Loại Mã Giảm Giá Không Được Để Trống',
                'start_at.required' => 'Trường Thời Hạn Hiệu Lực Mã Giảm Giá Không Được Để Trống',
                'start_at.date' => 'Trường Thời Hạn Hiệu Lực Mã Giảm Giá Phải Theo Dạng YYYY/MM/DD',
                'expires_at.required' => 'Trường Thời Hạn Mã Giảm Giá Không Được Để Trống',
                'expires_at.date' => 'Trường Thời Hạn Mã Giảm Giá Phải Theo Dạng YYYY/MM/DD',
                'quantity.required' => 'Trường Số Lượng Không Được Để Trống',
                'quantity.numeric' => 'Số Lượng Mã Giảm Giá Không Hợp Lệ',
                'quantity.min' => 'Số Lượng Mã Giảm Giá Phải Lớn Hơn 0',
                'min_order_value.numeric' => 'Giá Trị Mã Giảm Giá Phải Là Số Nguyên',
                'min_order_value.min' => 'Giá Trị Mã Giảm Giá Phải Phải Lớn Hơn 0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $coupon = new Coupon();

            $coupon->fill($request->all());

            $coupon->save();

            if ($coupon->save()) {
                return response()->json([
                    'data' => $coupon,
                    'message' => 'Thêm mới mã giảm giá thành công'
                ], Response::HTTP_CREATED);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/CouponController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Coupon $coupon)
    {
        return response()->json([
            'data' => $coupon
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Coupon $coupon)
    {
        try {
            $validator = Validator::make($request->all(), [
                'coupon_code' => [
                    'required',
                    'string',
                    Rule::unique('coupons', 'coupon_code')->ignore($coupon->id),
                ],
                'description' => 'required|string',
                'type' => ['required', Rule::in(['discount_percentage', 'discount_amount'])],
                'discount' => [
                    'required',
                    function ($attribute, $value, $fail) use ($request) {
                        if ($request->type === 'discount_percentage') {
                            if ($value <= 0 || $value >= 100) {
                                $fail('Phần Trăm Không Được Nhỏ Hơn 0 Hoặc Lớn Hơn 100');
                            }
                        } elseif ($request->type === 'discount_amount') {
                            if (!is_numeric($value)) {
                                $fail('Số Tiền Giảm Giá Phải Là Số Nguyên');
                            }
                        }
                    },
                ],
                'start_at' => 'required|date',
                'expires_at' => 'required|date',
                'quantity' => 'required|numeric|min:0',
                'min_order_value' => 'nullable|numeric|min:0'
            ], [
                'coupon_code.required' => 'Trường Mã Giảm Giá Không Được Trống',
                'coupon_code.string' => 'Trường Mã Giảm Giá Phải Là Một Chuỗi',
                'coupon_code.unique' => 'Mã Giảm Giá Đã Tồn Tại',
                'description.required' => 'Trường Mô Tả Mã Giảm Giá Không Được Trống',
                'description.string' => 'Trường Mô Tả Mã Giảm Giá Phải Là Một Chuỗi',
                'type.required' => 'Trường Loại Mã Giảm Giá Không Được Để Trống',
                'start_at.required' => 'Trường Thời Hạn Hiệu Lực Mã Giảm Giá Không Được Để Trống',
                'start_at.date' => 'Trường Thời Hạn Hiệu Lực Mã Giảm Giá Phải Theo Dạng YYYY/MM/DD',
                'expires_at.required' => 'Trường Thời Hạn Mã Giảm Giá Không Được Để Trống',
                'expires_at.date' => 'Trường Thời Hạn Mã Giảm Giá Phải Theo Dạng YYYY/MM/DD hh:mm:ss',
                'quantity.required' => 'Trường Số Lượng Không Được Để Trống',
                'quantity.numeric' => 'Số Lượng Mã Giảm Giá Không Hợp Lệ',
                'quantity.min' => 'Số Lượng Mã Giảm Giá Phải Lớn Hơn 0',
                'min_order_value.numeric' => 'Giá Trị Mã Giảm Giá Phải Là Số Nguyên',
                'min_order_value.min' => 'Giá Trị Mã Giảm Giá Phải Phải Lớn Hơn 0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $coupon->fill($request->all());

            $coupon->save();

            if ($coupon->save()) {
                return response()->json([
                    'data' => $coupon,
                    'message' => "Cập nhật mã giảm giá $coupon->coupon_code thành công"
                ], Response::HTTP_CREATED);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/CouponController@update: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Coupon $coupon)
    {
        try {
            $coupon->delete();

            return response()->json([
                'message' => "Đã xoá mã giảm giá $coupon->coupon_code thành công"
            ], Response::HTTP_NO_CONTENT);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/CouponController@destroy:', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}