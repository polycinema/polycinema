<?php

namespace App\Http\Controllers\API\Auth;

use App\Events\RegistedUser;
use App\Http\Controllers\Controller;
use App\Mail\WelcomeNewUserMail;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthenController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email'     => 'required',
                'password'  => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $user = User::query()->where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'error' => 'Đăng nhập thất bại, tài khoản hoặc mật khẩu không đúng'
                ], Response::HTTP_BAD_REQUEST);
            }

            if ($user->status == User::BANNED) {
                return response()->json([
                    'error' => 'Tài khoản của bạn đã bị khóa vì vi phạm chính sách cộng động'
                ], Response::HTTP_UNAUTHORIZED);
            }

            $token = $user->createToken(__CLASS__);

            return response()->json([
                'token' => $token->plainTextToken,
                'user'  => $user
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('AuthenController@login: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function register(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name'      => ['required', 'string', 'max:255'],
                'email'     => ['required', 'string', 'email', 'unique:' . User::class],
                'password'  => ['required', Password::defaults()]
            ], [
                'email.unique' => 'Tài khoản đã được đăng ký'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            /** @var User $user */
            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => Hash::make($request->password)
            ]);

            Mail::to($user->email)->send(new WelcomeNewUserMail($user));

            $token = $user->createToken(__CLASS__);

            return response()->json([
                'token'     => $token->plainTextToken,
                'user'      => $user
            ], Response::HTTP_CREATED);
        } catch (Exception $exception) {
            Log::error('AuthenController@register: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function logout(Request $request)
    {
        try {
            /** @var User $user */
            $user = $request->user();

            //  delete the current login session
            // $user->currentAccessToken()->delete();

            //  delete all session of current user
            $user->tokens()->delete();

            //  delete by ID
            // $tokenId = $user->currentAccessToken()->id;
            // $user->tokens()->where('id', $tokenId)->delete();

            return response()->json([], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('AuthenController@logout: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
