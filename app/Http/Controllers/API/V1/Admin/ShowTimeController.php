<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Seat;
use App\Models\ShowTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ShowTimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $showtimes = ShowTime::query()
                ->with('seats')
                ->with('room')
                ->with('movie')
                ->where('level', 'show')
                ->orderBy('show_date', 'asc')
                ->get();

            return response()->json([
                'data' => $showtimes
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@index: ', [$exception->getMessage()]);

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
        try {
            // $validator = Validator::make($request->all(), [
            //     'movie_id' => 'required',
            //     'room_id' => 'required',
            //     'show_date' => 'required|date_format:Y/m/d|after_or_equal:today',
            //     'start_time' => [
            //         'required',
            //         'date_format:H:i:s',
            //         function ($attribute, $value, $fail) use ($request) {
            //             $hour = date('H', strtotime($value));
            //             $existingShowtime = Showtime::where('show_date', $request->show_date)
            //                 ->where('room_id', $request->room_id)
            //                 ->whereRaw("HOUR(start_time) = $hour")
            //                 ->first();

            //             if ($existingShowtime) {
            //                 $fail("Đã có 1 xuất chiếu khác vào" . " " . explode(':', $request->start_time)[0] . "h " . "hoặc phòng $request->room_id");
            //             }
            //         },
            //     ],
            // ], [
            //     'movie_id.required' => 'Vui Lòng Chọn Phim',
            //     'room_id.required' => 'Vui Lòng Chọn Phòng Chiếu',
            //     'show_date.required' => 'Vui Lòng Chọn Ngày Chiếu',
            //     'show_date.date_format' => 'Định Dạng Ngày Chiếu Yêu Cầu Năm/Tháng/Ngày',
            //     'show_date.after_or_equal' => 'Ngày Chiếu Phải Là Ngày Hôm Nay Hoặc Ngày Trong Tương Lai',
            //     'start_time.required' => 'Vui Lòng Chọn Giờ Chiếu Phim',
            //     'start_time.date_format' => 'Định Dạng Giờ Chiếu Yêu Cầu Giờ/Phút/Giây',
            // ]);

            // if ($validator->fails()) {
            //     return response()->json([
            //         'errors' => $validator->errors()
            //     ], Response::HTTP_UNPROCESSABLE_ENTITY);
            // }

            // $showtime = ShowTime::create($request->all());
            // $showtime = ShowTime::query()->with('room')->find($showtime->id);

            // $single_seat = $showtime->room->single_seat;
            // $double_seat = $showtime->room->double_seat;
            // $special_seat = $showtime->room->special_seat;

            // if ($showtime) {
            //     // $single_price = $showtime->room->single_seat_price;
            //     // $double_price = $showtime->room->double_seat_price;
            //     // $special_price = $showtime->room->special_seat_price;

            //     $single_price = Seat::TYPE['single'];
            //     $double_price = Seat::TYPE['double'];
            //     $special_price = Seat::TYPE['special'];

            //     for ($i = 1; $i <= $single_seat; $i++) {
            //         Seat::create([
            //             'seat_name' => 'A' . $i,
            //             'type' => 'single',
            //             'showtime_id' => $showtime->id,
            //             'status' => 'unbook',
            //             'price' => $single_price,
            //             'user_id' => NULL,
            //             'booking_id' => NULL,
            //         ]);
            //     }

            //     for ($i = 1; $i <= $double_seat; $i++) {
            //         Seat::create([
            //             'seat_name' => 'D' . $i,
            //             'type' => 'double',
            //             'showtime_id' => $showtime->id,
            //             'status' => 'unbook',
            //             'price' => $double_price,
            //             'user_id' => NULL,
            //             'booking_id' => NULL,
            //         ]);
            //     }

            //     for ($i = 1; $i <= $special_seat; $i++) {
            //         Seat::create([
            //             'seat_name' => 'S' . $i,
            //             'type' => 'special',
            //             'showtime_id' => $showtime->id,
            //             'status' => 'unbook',
            //             'price' => $special_price,
            //             'user_id' => NULL,
            //             'booking_id' => NULL,
            //         ]);
            //     }
            // }

            $validator = Validator::make($request->all(), [
                'movie_id' => 'required',
                'room_id' => 'required',
                'show_date' => 'required|date_format:Y/m/d|after_or_equal:today',
                'start_time' => [
                    'required',
                    'date_format:H:i:s',
                    function ($attribute, $value, $fail) use ($request) {
                        $hour = date('H', strtotime($value));
                        $existingShowtime = Showtime::where('show_date', $request->show_date)
                            ->where('room_id', $request->room_id)
                            ->whereRaw("HOUR(start_time) = $hour")
                            ->first();

                        if ($existingShowtime) {
                            $fail("Đã có 1 xuất chiếu khác vào" . " " . explode(':', $request->start_time)[0] . "h " . "hoặc phòng $request->room_id");
                        }
                    },
                ],
            ], [
                'movie_id.required' => 'Vui Lòng Chọn Phim',
                'room_id.required' => 'Vui Lòng Chọn Phòng Chiếu',
                'show_date.required' => 'Vui Lòng Chọn Ngày Chiếu',
                'show_date.date_format' => 'Định Dạng Ngày Chiếu Yêu Cầu Năm/Tháng/Ngày',
                'show_date.after_or_equal' => 'Ngày Chiếu Phải Là Ngày Hôm Nay Hoặc Ngày Trong Tương Lai',
                'start_time.required' => 'Vui Lòng Chọn Giờ Chiếu Phim',
                'start_time.date_format' => 'Định Dạng Giờ Chiếu Yêu Cầu Giờ/Phút/Giây',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $showtime = ShowTime::create([
                'movie_id' => $request->movie_id,
                'room_id' => $request->room_id,
                'show_date' => $request->show_date,
                'start_time' => $request->start_time,
            ]);

            $showtime = ShowTime::query()->with('room')->find($showtime->id);

            $seats = $this->createSeats($showtime);

            return response()->json([
                'data' => [
                    'showtime' => $showtime,
                    'seats' => $seats
                ],
                'message' => 'Tạo Thành Công Lịch Chiếu Phim'
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    private function createSeats($showtime)
    {
        $seats = [];
        // $rows = range('A', 'Z');
        $index = 1;

        foreach ($showtime->room->seatTypes as $seatType) {

            $first_character = strtoupper(substr($seatType->name, 0, 2));

            for ($qty = 0; $qty < $seatType->pivot->quantity; $qty++) {
                $seat = Seat::create([
                    'seat_name' => $first_character . $index++,
                    'seat_type_id' => $seatType->id,
                    'showtime_id' => $showtime->id,
                    'status' => 'unbook',
                    'price' => $seatType->price,
                    'user_id' => NULL,
                    'booking_id' => NULL,
                ]);

                $seats[] = $seat;
            }
        }

        return $seats;
    }

    private function createSeatName($rowName, $colIndex)
    {
        return $rowName . ' - ' . $colIndex;
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $showtime = ShowTime::with('seats')->find($id);

            if (!$showtime) {
                return response()->json([
                    'message' => 'NOT FOUND'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'data' => $showtime
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ShowTime $showtime)
    {
        try {
            $validator = Validator::make($request->all(), [
                'movie_id' => 'required',
                'room_id' => 'required',
                'show_date' => 'required|date_format:Y/m/d|after_or_equal:today',
                'start_time' => 'required|date_format:H:i:s',
                // 'end_time' => 'required|date_format:H:i:s|different:start_time|after:start_time'
            ], [
                'movie_id.required' => 'Vui Lòng Chọn Phim',
                'room_id.required' => 'Vui Lòng Chọn Phòng Chiếu',
                'show_date.required' => 'Vui Lòng Chọn Ngày Chiếu',
                'show_date.date_format' => 'Định Dạng Ngày Chiếu Yêu Cầu Năm/Tháng/Ngày',
                'show_date.after_or_equal' => 'Ngày Chiếu Phải Là Ngày Hôm Nay Hoặc Ngày Trong Tương Lai',
                'start_time.required' => 'Vui Lòng Chọn Giờ Chiếu Phim',
                'start_time.date_format' => 'Định Dạng Giờ Chiếu Yêu Cầu Giờ/Phút/Giây',
                // 'end_time.required' => 'Vui Lòng Chọn Giờ Kết Thúc Chiếu Phim',
                // 'end_time.date_format' => 'Định Dạng Giờ Kết Thúc Chiếu Phim Yêu Cầu Giờ/Phút/Giây',
                // 'end_time.different' => 'Giờ Kết Thúc Chiếu Phim Không Được Trùng Giờ Chiếu Phim',
                // 'end_time.after' => 'Giờ Kết Thúc Chiếu Phim Phải Sau Giờ Chiếu Phim',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            $showtime->fill($request->all());
            $showtime->save();

            if ($showtime->save()) {
                return response()->json([
                    'data' => $showtime,
                    'message' => 'Tạo Cập Nhật Lịch Chiếu Phim'
                ], Response::HTTP_OK);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@update: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ShowTime $showtime)
    {
        try {
            $deleted = $showtime->delete();

            if ($deleted) {
                return response()->json([
                    'message' => "Xoá lịch chiếu $showtime->show_date thành công"
                ], Response::HTTP_OK);
            }
        } catch (\Exception $exception) {
            Log::error('API/V1/Admin/ShowTimeController@destroy: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
