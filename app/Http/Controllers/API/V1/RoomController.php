<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class RoomController extends Controller
{
    public function changeLevelRoom(Request $request)
    {
        // Post request id Room
        try {
            $room = Room::find($request->room_id);

            $level_room = $room->level;

            switch ($level_room) {
                case Room::LEVEL_HIDE:
                    $room->level = Room::LEVEL_SHOW;
                    $message = "Đã khôi phục phòng $room->room_name";
                    break;
                case Room::LEVEL_SHOW:
                    $room->level = Room::LEVEL_HIDE;
                    $message = "Đã ẩn phòng $room->room_name";
                    break;
            }

            $room->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/RoomController@changeLevelRoom: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listRoomInTrash()
    {
        try {
            $room = Room::query()->where('level','hide')->get();

            return response()->json([
                'data' => $room
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/RoomController@listRoomInTrash: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
