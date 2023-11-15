<?php

namespace App\Http\Controllers\API\V1\Seat;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Seat;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class SeatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $room_id = Room::count();
            $results = [];

            for ($i = 0; $i <= $room_id; $i++) {
                if ($i !== 0) {
                    $seats = Seat::where('status', 'unbook')->where('room_id', $i)->count();
                    $results[$i] = $seats;
                }
            }

            return response()->json([
                'data' => $results,
            ], Response::HTTP_OK);

        } catch (Exception $exception) {
            Log::error('API/V1/Seat/SeatController@show:, '[$exception->getMessage()]);

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
     * Đếm số ghế ở trạng thái unbook(chưa đặt) theo room_id bảng showtimes
     */
    public function show(string $id)
    {
        
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
        //
    }
}
