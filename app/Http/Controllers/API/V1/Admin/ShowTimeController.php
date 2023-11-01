<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShowTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ShowTimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $showtimes = ShowTime::all();

            return response()->json([
                'data' => $showtimes
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@index: ', [$exception->getMessage()]);

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
                'movie_id' => 'required',
                'room_id' => 'required',
                'show_date' => 'required|date_format:Y/m/d',
                'start_time' => 'required|date_format:H:i:s',
                'end_time' => 'required|date_format:H:i:s|different:start_time|after:start_time'
            ], [
                'movie_id.required' => 'Vui Lòng Chọn Phim',
                'room_id.required' => 'Vui Lòng Chọn Phòng Chiếu',
                'show_date.required' => 'Vui Lòng Chọn Ngày Chiếu',
                'show_date.date_format' => 'Định Dạng Ngày Chiếu Yêu Cầu Năm/Tháng/Ngày',
                'start_time.required' => 'Vui Lòng Chọn Giờ Chiếu Phim',
                'start_time.date_format' => 'Định Dạng Giờ Chiếu Yêu Cầu Giờ/Phút/Giây',
                'end_time.required' => 'Vui Lòng Chọn Giờ Kết Thúc Chiếu Phim',
                'end_time.date_format' => 'Định Dạng Giờ Kết Thúc Chiếu Phim Yêu Cầu Giờ/Phút/Giây',
                'end_time.different' => 'Giờ Kết Thúc Chiếu Phim Không Được Trùng Giờ Chiếu Phim',
                'end_time.after' => 'Giờ Kết Thúc Chiếu Phim Phải Sau Giờ Chiếu Phim',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            $showtime = ShowTime::create($request->all());

            if ($showtime) {
                return response()->json([
                    'data' => $showtime,
                    'message' => 'Tạo Thành Công Lịch Chiếu Phim'
                ], Response::HTTP_OK);
            }

        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@store: ', [$exception->getMessage()]);

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
        try {
            $showtime = ShowTime::find($id);
            // $movie = Movie::find($showtime->movie_id);
            // $room = Room::find($showtime->movie_id);
            if (!$showtime) {
                return response()->json([
                    'message' => 'NOT FOUND'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'data' => $showtime
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShowTime $showtime)
    {
        try {
            $validator = Validator::make($request->all(), [
                'movie_id' => 'required',
                'room_id' => 'required',
                'show_date' => 'required|date_format:Y/m/d',
                'start_time' => 'required|date_format:H:i:s',
                'end_time' => 'required|date_format:H:i:s|different:start_time|after:start_time'
            ], [
                'movie_id.required' => 'Vui Lòng Chọn Phim',
                'room_id.required' => 'Vui Lòng Chọn Phòng Chiếu',
                'show_date.required' => 'Vui Lòng Chọn Ngày Chiếu',
                'show_date.date_format' => 'Định Dạng Ngày Chiếu Yêu Cầu Năm/Tháng/Ngày',
                'start_time.required' => 'Vui Lòng Chọn Giờ Chiếu Phim',
                'start_time.date_format' => 'Định Dạng Giờ Chiếu Yêu Cầu Giờ/Phút/Giây',
                'end_time.required' => 'Vui Lòng Chọn Giờ Kết Thúc Chiếu Phim',
                'end_time.date_format' => 'Định Dạng Giờ Kết Thúc Chiếu Phim Yêu Cầu Giờ/Phút/Giây',
                'end_time.different' => 'Giờ Kết Thúc Chiếu Phim Không Được Trùng Giờ Chiếu Phim',
                'end_time.after' => 'Giờ Kết Thúc Chiếu Phim Phải Sau Giờ Chiếu Phim',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            $showtime->fill($request->all());
            $showtime->save();

            if ($showtime->save()) {
                return response()->json([
                    'data' => $showtime,
                    'message' => 'Tạo Cập Nhật Lịch Chiếu Phim'
                ], Response::HTTP_OK);
            }

        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@update: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShowTime $showtime)
    {   
        try {

            $deleted = $showtime->delete();

            if($deleted){
                return response()->json([
                    'message' => "Xoá lịch chiếu $showtime->show_date thành công"
                ], Response::HTTP_OK);
            }
            
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@destroy: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
