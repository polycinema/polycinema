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
                'single_seat' => 'numeric',
                'double_seat' => 'numeric',
                'special_seat' => 'numeric',
                'single_seat_price' => 'required',
                'double_seat_price' => 'required',
                'special_seat_price' => 'required'
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'room_name.unique' => "Phòng $request->room_name đã tồn tại ",
                'single_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'double_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'special_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'single_seat_price.required' => 'Vui lòng chọn giá cho loại ghế đơn',
                'double_seat_price.required' => 'Vui lòng chọn giá cho loại ghế đôi',
                'special_seat_price.required' => 'Vui lòng chọn giá cho loại ghế VIP'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $room = Room::create([
                'room_name' => $request->room_name,
                'single_seat' => $request->single_seat,
                'double_seat' => $request->double_seat,
                'special_seat' => $request->special_seat,
                'single_seat_price' => $request->single_seat_price,
                'double_seat_price' => $request->double_seat_price,
                'special_seat_price' => $request->special_seat_price,
                'capacity' => $request->single_seat + $request->double_seat + $request->special_seat,
            ]);

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
                'special_seat' => 'numeric',
                'single_seat_price' => 'required',
                'double_seat_price' => 'required',
                'special_seat_price' => 'required'
            ], [
                'room_name.required' => 'Trường tên phòng không được trống',
                'room_name.unique' => "Phòng $request->room_name đã tồn tại ",
                'single_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'double_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'special_seat.numeric' => 'Trường ghế đơn của phòng phải là số nguyên',
                'single_seat_price.required' => 'Vui lòng chọn giá cho loại ghế đơn',
                'double_seat_price.required' => 'Vui lòng chọn giá cho loại ghế đôi',
                'special_seat_price.required' => 'Vui lòng chọn giá cho loại ghế VIP'
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
                'single_seat_price' => $request->single_seat_price,
                'double_seat_price' => $request->double_seat_price,
                'special_seat_price' => $request->special_seat_price,
                'capacity' => $request->single_seat + $request->double_seat + $request->special_seat,
            ]);

            $room = Room::query()->find($room->id);

            foreach ($room->showtimes as $showtime) {
                foreach ($showtime->seats as $seat) {
                    switch ($seat->type) {
                        case 'single':
                            $seat->update(['price' => $room->single_seat_price]);
                            break;
                        case 'double':
                            $seat->update(['price' => $room->double_seat_price]);
                            break;
                        case 'special':
                            $seat->update(['price' => $room->special_seat_price]);
                            break;
                    }
                }
            }

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
