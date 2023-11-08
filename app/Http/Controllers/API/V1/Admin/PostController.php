<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::query()->get();

            return response()->json([
                'data' => $posts
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/PostController@index: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $attributes = $request->all();

            $validator = Validator::make($attributes, [
                'title' => 'required',
                'summary' => 'required',
                'image' => 'required',
                'description' => 'required'
            ]);

            if($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $post = new Post();

            $post->fill($attributes);

            $post->save();

            return response()->json([
                'data' => $post,
                'message' => 'Đã thêm thành công'
            ], Response::HTTP_CREATED);
        }catch(Exception $exception) {
            Log::error('API/V1/Admin/PostController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        try{
            return response()->json([
                'data' => $post
            ], Response::HTTP_OK);
        }catch(Exception $exception) {
            Log::error('API/V1/Admin/PostController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        try{
            $attributes = $request->all();

            $validator = Validator::make($attributes, [
                'title' => 'required',
                'summary' => 'required',
                'image' => 'required',
                'description' => 'required'
            ]);

            if($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $post->fill($attributes);

            $post->save();

            return response()->json([
                'data' => $post,
                'message' => 'Đã sửa thành công'
            ], Response::HTTP_CREATED);
        }catch(Exception $exception) {
            Log::error('API/V1/Admin/PostController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        try{
            $post->delete();

            return response()->json([
                'message' => 'Đã xoá thành công'
            ], Response::HTTP_NO_CONTENT);
        }catch(Exception $exception) {
            Log::error('API/V1/Admin/PostController@delete: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
