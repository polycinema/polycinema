<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Actor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $actors = Actor::query()->where('level','show')->get();

            return response()->json([
                'data' => $actors
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ActorController@index: ', [$exception->getMessage()]);

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
                'name' => 'required',
                'date_of_birth' => 'required',
                'image' => 'required'
            ], [
                'name.required' => 'Trường tên là bắt buộc',
                'date_of_birth.required' => 'Trường ngày sinh là bắt buộc',
                // 'date_of_birth.date' => 'Trường ngày sinh phải là một ngày hợp lệ',
                'image.required' => 'Trường ảnh là bắt buộc',
                // 'image.string' => 'Trường ảnh phải là một chuỗi',
                // 'image.image' => 'Trường ảnh phải là một tệp hình ảnh hợp lệ',
                // 'image.mimes' => 'Trường ảnh phải có định dạng: png, jpg, jpeg, gif, webp'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $actor = new Actor();

            $actor->fill($request->all());

            // if ($request->hasFile('image')) {
            //     $actor->image = upload_file('actors', $request->file('image'));
            // }

            $actor->save();

            return response()->json([
                'data' => $actor,
                'message' => 'Thêm mới diễn viên thành công'
            ], Response::HTTP_CREATED);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ActorController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Actor $actor)
    {
        return response()->json([
            'data' => $actor
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Actor $actor)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'date_of_birth' => 'required|date',
                'image' => 'required'
            ], [
                'name.required' => 'Trường tên là bắt buộc',
                'date_of_birth.required' => 'Trường ngày sinh là bắt buộc',
                'date_of_birth.date' => 'Trường ngày sinh phải là một ngày hợp lệ',
                'image.required' => 'Trường ảnh là bắt buộc',
                // 'image.string' => 'Trường ảnh phải là một chuỗi',
                // 'image.image' => 'Trường ảnh phải là một tệp hình ảnh hợp lệ',
                // 'image.mimes' => 'Trường ảnh phải có định dạng: png, jpg, jpeg, gif, webp'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // $oldImage = $actor->image;
            $actor->fill($request->all());

            // if ($request->hasFile('image')) {
            //     $actor->image = upload_file('actors', $request->file('image'));
            //     delete_file($oldImage);
            // }

            $actor->save();

            return response()->json([
                'data' => $actor,
                'message' => 'Cập nhật diễn viên thành công'
            ], Response::HTTP_CREATED);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ActorController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Actor $actor)
    {
        try {
            $actor->delete();

            // $actor->movies()->detach();

            // delete_file($actor->image);

            return response()->json([
                'message' => 'Đã xoá thành công'
            ], Response::HTTP_NO_CONTENT);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ActorController@destroy:', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
