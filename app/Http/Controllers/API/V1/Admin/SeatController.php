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
        $seats = Seat::all();
        if ($seats) {
            return response()->json([
                'data' => $seats,
                'message' => 'Danh sách ghế'
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Đã có lỗi xảy ra',
                'message' => 'Truy vấn thất bại'
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
                'room_id' => 'required'
            ], [
                'seat_name.required' => 'Trường tên ghế không được trống',
                'type.required' => 'Trường loại ghế không được trống',
                'room_id.required' => 'Trường phòng không được trống'
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
        if ($seat) {
            return response()->json([
                'data' => $seat,
                'message' => "Thông tin ghế $seat->seat_name"
            ], Response::HTTP_OK);
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
                'room_id' => 'required'
            ], [
                'seat_name.required' => 'Trường tên ghế không được trống',
                'type.required' => 'Trường loại ghế không được trống',
                'room_id.required' => 'Trường phòng không được trống'
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