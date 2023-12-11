<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        try {
            $user_id = $request->user_id;

            $user = User::find($user_id);
            
            $profile_data = $request->all();
            
            $oldData = $user;
            
            $validator = Validator::make($request->all(), [
                'image' => 'string',
                'full_name' => 'string|max:255',
                'phone' => 'string|numeric|regex:/^0\d{9}$/|unique:users,phone,' . $user_id,
                'cccd' => 'numeric|min:9|unique:users,cccd,' . $user_id,
                'date_of_birth' => 'date_format:Y/m/d',
                'gender' => 'string',
                'city' => 'string',
                'district' => 'string',
            ], [
                'image.string' => 'Ảnh Không Hợp Lệ',
                'full_name.string' => 'Họ Tên Không Hợp Lệ',
                'full_name.max' => 'Họ Tên Quá Dài',
                'phone.numeric' => 'Số Điện Thoại Không Hợp Lệ',
                'phone.regex' => 'Số Điện Thoại Không Hợp Lệ',
                'phone.unique' => 'Số Điện Thoại Đã Được Đăng Ký',
                'cccd.numeric' => 'CCCD Không Hợp Lệ',
                'cccd.min' => 'CCCD Không Hợp Lệ',
                'cccd.unique' => 'CCCD Đã Được Đăng Ký',
                'date_of_birth.date_format' => 'Định Dạng Sinh Nhật Yêu Cầu Năm/Tháng/Ngày',
                'cccd.unique' => 'CCCD Đã Được Đăng Ký',
                'gender.string' => 'Giới Tính Không Hợp Lệ',
                'city.string' => 'Thành Phố Không Hợp Lệ',
                'district.string' => 'Quận/Huyện Không Hợp Lệ',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            foreach ($profile_data as $key => $value) {
                if ($value === $oldData[$key]) {
                    unset($profile_data[$key]);
                }
            }

            $updated = $user->update($profile_data);

            if ($updated) {
                return response()->json([
                    'message' => 'Cập Nhật Thông Tin Thành Công',
                ], Response::HTTP_OK);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/ProfileController@updateProfile:' ,[$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}