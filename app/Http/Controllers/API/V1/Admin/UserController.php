<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::query()->get();

            return response()->json([
                'data' => $users,
                'message' => 'Danh sách người dùng'
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/UserConctroller@index:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
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
                'name' => 'required|min:2|max:25',
                'email' => 'required|email|min:12|max:50|unique:users,email',
                'password' => 'required|min:6|max:100|',
                // 're_password' => 'required|same:password',
                // 'role' => 'nullable',
            ], [
                'name.required' => 'Trường tên người dùng không được trống',
                'name.min' => 'Trường tên người dùng lớn hơn 2 ký tự',
                'name.max' => 'Trường tên người dùng nhỏ hơn 25 ký tự',
                'email.required' => 'Trường email không được trống',
                'email.email' => 'Trường email không hợp lệ',
                'email.min' => 'Trường email lớn hơn 12 ký tự',
                'email.max' => 'Trường email nhỏ hơn 50 ký tự',
                'email.unique' => 'Email đã được đăng ký',
                'password.required' => 'Mật khẩu không được trống',
                'password.min' => 'Mật khẩu phải lớn hơn 6 ký tự',
                'password.max' => 'Mật khẩu phải nhỏ hơn 100 ký tự',
                // 're_password.required' => 'Yêu cầu xác nhận mật khẩu',
                // 're_password.same' => 'Xác nhận mật khẩu không trùng nhau',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                // 'role' => $request->role
            ]);

            if ($user) {
                return response()->json([
                    'data' => $user,
                    'message' => "Thêm người dùng $user->name thành công",
                ], Response::HTTP_OK);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/UserConctroller@store:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            return response()->json([
                'data' => $user,
                'message' => "Thông tin người dùng $user->name",
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/UserConctroller@show:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        try {
            $info_data = $request->all();

            $oldData = $user;

            $validator = Validator::make($request->all(), [
                'image' => 'nullable|string',
                'full_name' => 'nullable|string|max:255',
                'phone' => 'nullable|string|numeric|regex:/^0\d{9}$/|unique:users,phone,' . $user->id,
                'email' => 'nullable|string|email|unique:users,email,' . $user->id,
                'date_of_birth' => 'nullable|date_format:Y/m/d',
                'gender' => 'nullable|string',
                'role' => 'nullable|string',
                'password' => 'nullable|string'
            ], [
                'image.string' => 'Ảnh Không Hợp Lệ',
                'full_name.string' => 'Họ Tên Không Hợp Lệ',
                'full_name.max' => 'Họ Tên Quá Dài',
                'phone.numeric' => 'Số Điện Thoại Không Hợp Lệ',
                'phone.regex' => 'Số Điện Thoại Không Hợp Lệ',
                'phone.unique' => 'Số Điện Thoại Đã Được Đăng Ký',
                'email.string' => 'Email Không Hợp Lệ',
                'email.email' => 'Địa chỉ Email không đúng định dạng',
                'email.unique' => 'Email Đã Được Đăng Ký',
                'date_of_birth.date_format' => 'Định Dạng Sinh Nhật Yêu Cầu Năm/Tháng/Ngày',
                'gender.string' => 'Giới Tính Không Hợp Lệ',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            foreach ($info_data as $key => $value) {
                if ($value === $oldData[$key] || $value == "") {
                    unset($info_data[$key]);
                }
            }

            $updated = $user->update($info_data);

            if ($updated) {
                return response()->json([
                    'message' => "Cập Nhật Thông Tin Người Dùng $user->name Thành Công",
                ], Response::HTTP_OK);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/UserConctroller@update:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $deleted = $user->delete();

        if ($deleted) {
            return response()->json([
                'data' => $user,
                'message' => "Đã xóa thành công người dùng $user->name"
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Đã có lỗi xảy ra',
                'message' => ''
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAdminUser()
    {
        try {
            $users = User::query()
                ->where('role', User::ADMIN)->get();

            return response()->json([
                'data' => $users
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/UserConctroller@getAdminUser:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getCustomers()
    {
        try {
            $users = User::query()
                ->where('role', User::CUSTOMER)->where('status',User::NORMAL)->get();

            return response()->json([
                'data' => $users
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/UserConctroller@getCustomers:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getBannedUsers()
    {
        try {
            $users = User::query()->where('status', User::BANNED)->get();

            return response()->json([
                'data' => $users,
                'message' => 'Danh sách người dùng bị BAN'
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/UserConctroller@getBannedUsers:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
