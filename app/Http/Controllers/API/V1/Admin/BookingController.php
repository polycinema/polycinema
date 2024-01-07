<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $bookings = Booking::query()->where('level', 'show')
                ->with('user')
                ->with('showtime.movie')
                ->with(['products' => function ($query) {
                    $query->withPivot('quantity');
                }])
                ->with(['seats.showtime.room'])
                ->get();

            return response()->json([
                'data' => $bookings
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/BookingController: ', [$exception->getMessage()]);

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $booking = Booking::query()->where('id', $id)
                ->with('user')
                ->with('showtime.movie')
                ->with(['products' => function ($query) {
                    $query->withPivot('quantity');
                }])
                ->with(['seats.showtime.room'])
                ->get();

            if ($booking->isEmpty()) {
                return response()->json([
                    'message' => "Đơn hàng không tồn tại"
                ], Response::HTTP_OK);
            }

            return response()->json([
                'data' => $booking
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/BookingController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $booking = Booking::find($id);

            if ($booking ==  NULL) {
                return response()->json([
                    'message' => "Đơn hàng không tồn tại"
                ], Response::HTTP_OK);
            }

            $booking->delete();

            return response()->json([
                'message' => "Xoá thành công đơn hàng $booking->booking_id"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/BookingController@destroy:', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
