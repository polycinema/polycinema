<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RoomRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
    public function store(RoomRequest $request)
    {
        if ($request->isMethod('POST')) {
            $room = Room::create($request->all());

            if ($room) {
                return response()->json([
                    'data' => $room,
                    'message' => 'Thêm phòng thành công'
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Tạo mới thất bại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            return back()->withInput(); // Quay trở lại route trước cùng với dự liệu Form
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if ($id) {
            $room = Room::find($id);

            if ($room) {
                return response()->json([
                    'data' => $room,
                    'message' => "Thông tin phòng $room->room_name"
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Phòng không tồn tại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            return back();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoomRequest $request, string $id)
    {
        if ($id) {
            $room = Room::find($id);
            if ($room) {
                $updated = $room->update($request->all());
                if ($updated) {
                    return response()->json([
                        'data' => $room,
                        'message' => "Đã cập nhật phòng $room->room_name"
                    ], Response::HTTP_OK);
                } else {
                    return response()->json([
                        'error' => 'Đã có lỗi xảy ra',
                        'message' => ''
                    ], Response::HTTP_INTERNAL_SERVER_ERROR);
                    return back()->withInput();
                }
            }
        } else {
            return back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($id) {
            $room = Room::find($id);

            if ($room) {
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
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Ghế không tồn tại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }
}
