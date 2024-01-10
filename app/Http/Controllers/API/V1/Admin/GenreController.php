<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $genres = Genre::query()->where('level','show')->get();

            return response()->json([
                'data' => $genres
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/GenreController@index: ', [$exception->getMessage()]);

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
        try {
            $validator = Validator::make([
                'name' => 'required|unique:genres,name'
            ], [
                'name.required' => 'Vui lòng nhập tên thể loại'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $genre = new Genre();

            $genre->fill($request->all());

            $genre->save();

            return response()->json([
                'message' => 'Đã thêm thành công',
                'data' => $genre
            ], Response::HTTP_CREATED);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/GenreController@store:', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Genre $genre)
    {
        try {
            return response()->json([
                'data' => $genre
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/GenreController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        try {
            $validator = Validator::make([
                'name' => 'required'
            ], [
                'name.required' => 'Vui lòng nhập tên thể loại'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $genre->fill($request->all());

            $genre->save();

            $genre->update($request->all());

            return response()->json([
                'message' => 'Đã cập nhật thành công',
                'data' => $genre
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/GenreController@update:', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        try {
            $genre->delete();

            $genre->movies()->detach();

            return response()->json([
                'message' => 'Xoá thành công thể loại phim'
            ], Response::HTTP_NO_CONTENT);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/GenreController@destroy:', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
