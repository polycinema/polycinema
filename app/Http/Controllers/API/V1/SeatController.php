<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Seat;
use App\Models\ShowTime;
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

    public function getSeatShowTime(string $showtimeId) {
        try{
            // $seats = Seat::query()->where('showtime_id', $showtimeId)->get();
            $showtimes = ShowTime::query()->with('seats.seatType')->with('movie.genres')->with("room")->find($showtimeId);
            return response()->json([
                'data' => $showtimes
            ], Response::HTTP_OK);
        }catch(Exception $exception) {
            Log::error('SeatController@getSeatByMovie: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
