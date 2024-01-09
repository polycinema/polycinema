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
     * @var $request: [
     *     room_name: 'B - 20'
     *     seat_types: [
     *  {id: 1, quantity: 30}
     * ]
     * ]
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'room_name' => 'required|unique:rooms,room_name',
                'seat_types' => 'required'
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'room_name.unique' => "Phòng $request->room_name đã tồn tại",
                'seat_types.required' => 'Vui lòng chọn loại ghế'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $room = Room::create([
                'room_name' => $request->room_name,
                // 'single_seat' => $request->single_seat,
                // 'double_seat' => $request->double_seat,
                // 'special_seat' => $request->special_seat,
                // 'capacity' => $request->single_seat + $request->double_seat + $request->special_seat,
                'capacity' => 0
            ]);

            foreach ($request->seat_types as $seatType) {
                $room->seatTypes()->attach($seatType['id'], ['quantity' => $seatType['quantity']]);
            }

            $room->update(['capacity' => $room->seatTypes()->sum('quantity')]);

            return response()->json([
                'message' => 'Tạo mới thành công phòng chiếu'
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
    public function show(Room $room)
    {
        try {
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
                'single_seat' => 'numeric',
                'double_seat' => 'numeric',
                'special_seat' => 'numeric'
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'room_name.unique' => "Phòng $request->room_name đã tồn tại ",
                'single_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'double_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'special_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $room->update([
                'room_name' => $request->room_name,
                'single_seat' => $request->single_seat,
                'double_seat' => $request->double_seat,
                'special_seat' => $request->special_seat,
                'capacity' => $request->single_seat + $request->double_seat + $request->special_seat,
            ]);

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
