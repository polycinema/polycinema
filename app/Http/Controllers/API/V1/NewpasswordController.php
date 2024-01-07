<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
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
}
