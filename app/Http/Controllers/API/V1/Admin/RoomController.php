<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RoomRequest;
use App\Models\Room;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::all();
        if ($rooms) {
            return response()->json([
                'data' => $rooms,
                'message' => 'Danh sách phòng'
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
                'room_name' => 'required',
                'capacity' => 'required|numeric|min:0'
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'capacity.required' => 'Trường sức chứa của phòng không được trống',
                'capacity.numeric' => 'Trường sức chứa của phòng phải là số nguyên',
                'capacity.min' => 'Trường sức chứa của phòng phải lớn hơn 0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            if ($request->isMethod('POST')) {
                $room = Room::create($request->all());

                if ($room) {
                    return response()->json([
                        'data' => $room,
                        'message' => "Thêm phòng $room->room_name thành công"
                    ], Response::HTTP_OK);
                } else {
                    return response()->json([
                        'error' => 'Đã có lỗi xảy ra',
                        'message' => 'Tạo mới thất bại'
                    ], Response::HTTP_INTERNAL_SERVER_ERROR);
                }
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/RoomController@store:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        return response()->json([
            'data' => $room,
            'message' => "Thông tin sản phẩm $room->room_name"
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        try {
            $validator = Validator::make($request->all(), [
                'room_name' => 'required',
                'capacity' => 'required|numeric|min:1'
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'capacity.required' => 'Trường sức chứa của phòng không được trống',
                'capacity.numeric' => 'Trường sức chứa của phòng phải là số nguyên',
                'capacity.min' => 'Trường sức chứa của phòng phải lớn hơn 0'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $room->fill($request->all());
            $room->save();
            
            return response()->json([
                'data' => $room,
                'message' => "Đã cập nhật phòng $room->room_name"
            ], Response::HTTP_OK);

        } catch (Exception $exception) {
            Log::error('API/V1/Admin/RoomController@update:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $deleted = $room->delete();

        if ($deleted) {
            return response()->json([
                'data' => $room,
                'message' => "Đã xóa thành công phòng $room->room_name"
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Đã có lỗi xảy ra',
                'message' => ''
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}