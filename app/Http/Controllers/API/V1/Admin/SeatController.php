<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        if ($request->isMethod('POST')) {
            $seat = Seat::create($request->all());

            if ($seat) {
                return response()->json([
                    'data' => $seat,
                    'message' => 'Thêm ghế thành công'
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
            $seat = Seat::find($id);

            if ($seat) {
                return response()->json([
                    'data' => $seat,
                    'message' => "Thông tin ghế $id"
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Ghế không tồn tại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } else {
            return back();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if ($id) {
            $seat = Seat::find($id);

            if ($seat) {
                $updated = $seat->update($request->all());
                if ($updated) {
                    return response()->json([
                        'data' => $seat,
                        'message' => "Đã cập nhật ghế $id"
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
            $seat = Seat::find($id);

            if ($seat) {
                $deleted = $seat->delete();

                if ($deleted) {
                    return response()->json([
                        'data' => $seat,
                        'message' => "Đã xóa thành công ghế $id"
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
