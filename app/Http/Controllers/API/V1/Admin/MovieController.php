<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $movies = Movie::query()->with('director')
                ->with('genres')
                ->with('actors')
                ->where('level', 'show')
                ->get();

            return response()->json([
                'data' => $movies
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/MovieController@index: ', [$exception->getMessage()]);

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
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'title' => 'required',
                'image' => 'required',
                'trailer' => 'required|string',
                'description' => 'required',
                'release_date' => 'required|date',
                'duration' => 'required|integer',
                'director_id' => 'required|integer',
                'actors' => 'required',
                'genres' => 'required',
                'status' => 'required'
            ], [
                'name.required' => 'Vui lòng nhập tên.',
                'title.required' => 'Vui lòng nhập tiêu đề.',
                'image.required' => 'Vui lòng chọn hình ảnh.',
                'trailer.required' => 'Vui lòng chọn video trailer.',
                'trailer.mimetypes' => 'Video trailer phải có định dạng MP4 hoặc QuickTime.',
                'description.required' => 'Vui lòng nhập mô tả.',
                'release_date.required' => 'Vui lòng chọn ngày phát hành.',
                'release_date.date' => 'Ngày phát hành không hợp lệ.',
                'duration.required' => 'Vui lòng nhập thời lượng.',
                'duration.integer' => 'Thời lượng phải là số nguyên.',
                'director_id.required' => 'Vui lòng chọn đạo diễn.',
                'director_id.integer' => 'Đạo diễn phải là số nguyên.',
                'actors.required' => 'Vui lòng chọn diễn viên',
                'status.required' => 'Vui lòng chọn trạng thái phim',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $movie = new Movie();

            $movie->fill($request->all());

            // if ($request->hasFile('image')) {
            //     $movie->image = upload_file('movies', $request->file('image'));
            // }

            $movie->save();
            $movie->actors()->attach($request->input('actors'));
            $movie->genres()->attach($request->input('genres'));

            return response()->json([
                'message' => 'Thêm mới phim thành công !',
                'data' => $movie
            ], Response::HTTP_CREATED);
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/MovieController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // return response()->json([
        //     'data' => $movie
        // ], Response::HTTP_OK);
        try {
            $movie = Movie::with('genres')->with('actors')->find($id);

            if (!$movie) {
                return response()->json([
                    'message' => 'NOT FOUND'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'data' => $movie
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/MovieController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'title' => 'required',
                'image' => 'required',
                'trailer' => 'required|string',
                'description' => 'required',
                'release_date' => 'required|date',
                'duration' => 'required|integer',
                'director_id' => 'required|integer',
                'actors' => 'required',
                'genres' => 'required',
                'status' => 'required'
            ], [
                'name.required' => 'Vui lòng nhập tên.',
                'title.required' => 'Vui lòng nhập tiêu đề.',
                'image.required' => 'Vui lòng chọn hình ảnh',
                'trailer.required' => 'Vui lòng chọn video trailer.',
                'description.required' => 'Vui lòng nhập mô tả.',
                'release_date.required' => 'Vui lòng chọn ngày phát hành.',
                'release_date.date' => 'Ngày phát hành không hợp lệ.',
                'duration.required' => 'Vui lòng nhập thời lượng.',
                'duration.integer' => 'Thời lượng phải là số nguyên.',
                'director_id.required' => 'Vui lòng chọn đạo diễn.',
                'director_id.integer' => 'Đạo diễn phải là số nguyên.',
                'actors.required' => 'Vui lòng chọn diễn viên',
                'status.required' => 'Vui lòng chọn trạng thái phim',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            // $oldImage = $movie->image;

            $movie->fill($request->all());

            $movie->save();
            $movie->actors()->sync($request->input('actors'));
            $movie->genres()->sync($request->input('genres'));

            // if ($request->hasFile('image')) {
            //     $movie->image = upload_file('movies', $request->file('image'));
            //     delete_file($oldImage);
            // }

            return response()->json([
                'message' => 'Đã cập nhật thành công',
                'data' => $movie
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/MovieController@update: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        try {
            $movie->delete();

            // delete_file($movie->image);

            $movie->actors()->detach();
            $movie->genres()->detach();

            return response()->json([
                'message' => 'Xoá phim thành công'
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/MovieController@destroy: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
