<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SeatRequest;
use App\Models\Seat;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SeatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $seats = Seat::query()->get();

            return response()->json([
                'data' => $seats
            ], Response::HTTP_OK);
        }catch(Exception $exception) {
            Log::error('SeatController@index: ', [$exception->getMessage()]);

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
                'seat_name' => 'required',
                'type' => 'required',
                'showtime_id' => 'required',
                'status' => 'required',
                'price' => 'required',
                'user_id' => 'nullable'
            ], [
                'seat_name.required' => 'Trường tên ghế không được trống',
                'type.required' => 'Trường loại ghế không được trống',
                'showtime_id.required' => 'Trường lịch chiếu không được trống',
                'status.required' => 'Trường trạng thái không được trống',
                'price.required' => 'Trường giá không được trống',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            if ($request->isMethod('POST')) {
                $seat = Seat::create($request->all());

                if ($seat) {
                    return response()->json([
                        'data' => $seat,
                        'message' => 'Thêm ghế thành công'
                    ], Response::HTTP_OK);
                }
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/SeatController@store:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Seat $seat)
    {
        try {
            return response()->json([
                'data' => $seat,
                'message' => "Thông tin ghế $seat->seat_name"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/SeatController@store:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Seat $seat)
    {
        try {
            $validator = Validator::make($request->all(), [
                'seat_name' => 'required',
                'type' => 'required',
                'showtime_id' => 'required',
                'status' => 'required',
                'price' => 'required',
                'user_id' => 'nullable'
            ], [
                'seat_name.required' => 'Trường tên ghế không được trống',
                'type.required' => 'Trường loại ghế không được trống',
                'showtime_id.required' => 'Trường lịch chiếu không được trống',
                'status.required' => 'Trường trạng thái không được trống',
                'price.required' => 'Trường giá không được trống',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $seat->fill($request->all());
            $seat->save();

            return response()->json([
                'data' => $seat,
                'message' => "Đã cập nhật ghế $seat->seat_name"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/SeatController@update:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seat $seat)
    {
        $deleted = $seat->delete();

        if ($deleted) {
            return response()->json([
                'data' => $seat,
                'message' => "Đã xóa thành công ghế $seat->seat_name"
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Đã có lỗi xảy ra',
                'message' => ''
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
