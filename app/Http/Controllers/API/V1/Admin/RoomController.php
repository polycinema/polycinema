<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RoomRequest;
use App\Models\Room;
use App\Models\Seat;
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
        $rooms = Room::query()->where('level','show')->get();
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


    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'room_name' => 'required|unique:rooms,room_name',
                'seat_types' => 'required|array'
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'room_name.unique' => "Phòng $request->room_name đã tồn tại",
                'seat_types.required' => 'Vui lòng chọn ít nhất một loại ghế'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            $capacity = 0;

            foreach ($request->seat_types as $seatType) {
                $capacity += $seatType['quantity'];
            }

            $room = Room::create([
                'room_name' => $request->room_name,
                'capacity' => $capacity,
            ]);

            foreach ($request->seat_types as $seatType) {
                $room->seatTypes()->attach($seatType['id'], ['quantity' => $seatType['quantity']]);
            }

            return response()->json([
                'message' => "Thêm phòng $room->room_name thành công"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/RoomController@store:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $room = Room::query()->with(['seatTypes'=>function($q){
                $q->withPivot('quantity');
            }])->find($id);
            return response()->json([
                'data' => $room,
                'message' => "Thông tin sản phẩm $room->room_name"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/RoomController@show:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        try {
            $validator = Validator::make($request->all(), [
                'room_name' => 'required|unique:rooms,room_name,' . $room->id,
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'room_name.unique' => "Phòng $request->room_name đã tồn tại ",
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $room->fill($request->all());

            $capacity = 0;
            foreach ($request->seat_types as $seatType) {
                $capacity += $seatType['quantity'];
            }
    
            $room->capacity = $capacity;

            $room->save();

            $seatTypesData = [];

            foreach ($request->seat_types as $seatType) {
                $seatTypesData[$seatType['id']] = ['quantity' => $seatType['quantity']];
            }

            $room->seatTypes()->sync($seatTypesData);

            

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
        try {
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
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/RoomController@destroy:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
