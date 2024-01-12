<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as RulesPassword;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

class NewpasswordController extends Controller
{
    public function forgotPassword(Request $request) {
        $request->validate([
            'email' => 'required|email'
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if($status === Password::RESET_LINK_SENT) {
            return [
                'status' => __($status)
            ];
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)]
        ]);
    }


    public function reset(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required',
            'password' => ['required', 'confirmed', RulesPassword::default()]
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60)
                ])->save();

                $user->tokens()->delete();

                event(new PasswordReset($user));
            }
        );

        if($status === Password::PASSWORD_RESET) {
            return response([
                'message' => 'Đặt lại mật khẩu thành công'
            ]);
        }

        return response([
            'message' => __($status)
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    // Chức năng BAN người dùng
    public function changeStatusUser(Request $request){
        try {
            $user = User::find($request->user_id);

            $status_user = $user->status;

            switch ($status_user) {
                case User::BANNED:
                    $user->status = User::NORMAL;
                    $message = "Đã mở BAN người dùng $user->name";
                    break;
                case User::NORMAL:
                    $user->status = User::BANNED;
                    $message = "Đã BAN người dùng $user->name";
                    break;
            }

            $user->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/NewpasswordController@changeStatusUser: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
