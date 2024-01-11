<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\ShowTime;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ShowTimeController extends Controller
{
    // Ẩn hiện booking theo id index bẳng bookings
    public function changeLevelShowTime(Request $request)
    {
        try {
            $showtime = ShowTime::find($request->showtime_id);

            $level_showtime = $showtime->level;

            switch ($level_showtime) {
                case ShowTime::LEVEL_HIDE:
                    $showtime->level = ShowTime::LEVEL_SHOW;
                    $message = "Đã khôi phục lịch chiếu $showtime->show_date";
                    break;
                case ShowTime::LEVEL_SHOW:
                    $showtime->level = ShowTime::LEVEL_HIDE;
                    $message = "Đã ẩn lịch chiếu $showtime->show_date";
                    break;
            }

            $showtime->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BookingController@changeLevelShowTime: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listShowTimeInTrash()
    {
        try {
            $products = ShowTime::query()
                ->where('level', 'hide')
                ->with('room')
                ->with('movie')
                ->get();

            return response()->json([
                'data' => $products
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/ShowTimeController@listShowTimeInTrash: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
