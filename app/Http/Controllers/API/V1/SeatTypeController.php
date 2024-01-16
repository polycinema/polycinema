<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Seat;
use App\Models\SeatType;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class SeatTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $seatTypes = SeatType::query()->where('level', 'show')->get();

            return response()->json([
                'data' => $seatTypes
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('SeatTypeController@index: ', [$exception->getMessage()]);

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
            $validator = Validator::make([
                'name' => 'required',
                'price' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
            ], [
                'name.required' => 'Vui lòng nhập tên loại ghế',
                'price.required' => 'Vui lòng nhập giá',
                'image.required' => 'Vui lòng chọn ảnh',
                'image.image' => 'File phải là hình ảnh.',
                'image.mimes' => 'Định dạng hình ảnh phải là jpeg, png, jpg.',
                'image.max' => 'Dung lượng file ảnh không được vượt quá 2048 KB.'
            ]);

            if ($validator->fails()) {
                return response([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $seatType = new SeatType();

            // if ($request->hasFile('image') && $request->file('image')->isValid()) {
            //     $filename = $request->file('image')->store('seat_type', 'public');
            //     $seatType->image = $filename;
            // }

            $seatType->name = $request->name;
            $seatType->price = $request->price;
            $seatType->image = $request->image;
            $seatType->save();

            return response()->json([
                'message' => "Thêm mới loại ghế $seatType->name"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('SeatTypeController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SeatType $seatType)
    {
        try {
            return response()->json([
                'data' => $seatType
            ], Response::HTTP_OK);
} catch (Exception $exception) {
            Log::error('SeatTypeController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SeatType $seatType)
    {
        try {
            $validator = Validator::make([
                'name' => 'nullable',
                'price' => 'nullable',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ], [
                'name.required' => 'Vui lòng nhập tên loại ghế',
                'price.required' => 'Vui lòng nhập giá',
                'image.required' => 'Vui lòng chọn ảnh',
                'image.image' => 'File phải là hình ảnh.',
                'image.mimes' => 'Định dạng hình ảnh phải là jpeg, png, jpg.',
                'image.max' => 'Dung lượng file ảnh không được vượt quá 2048 KB.'
            ]);

            if ($validator->fails()) {
                return response([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // if ($request->hasFile('image') && $request->file('image')->isValid()) {
            //     delete_file($old_data->image);
            //     $filename = $request->file('image')->store('seat_type', 'public');
            //     $seatType->image = $filename;
            // }

            $seatType->name = $request->name;
            $seatType->price = $request->price;
            $seatType->image = $request->image;

            $seatType->save();

            return response()->json([
                'message' => "cập nhật $seatType->name thành công"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('SeatTypeController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SeatType $seatType)
    {
        try {
            $seatType->delete();

            $seatType->rooms()->detach();

            return response()->json([], Response::HTTP_NO_CONTENT);
        } catch (Exception $exception) {
            Log::error('SeatTypeController@destroy: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function changeLevelSeatType(Request $request)
    {
        try {
            $seat_type = SeatType::find($request->seat_type_id);

            $level_seat_type = $seat_type->level;

            switch ($level_seat_type) {
                case SeatType::LEVEL_HIDE:
                    $seat_type->level = SeatType::LEVEL_SHOW;
                    $message = "Đã khôi phục loại ghế $seat_type->name";
                    break;
                case SeatType::LEVEL_SHOW:
                    $seat_type->level = SeatType::LEVEL_HIDE;
                    $message = "Đã ẩn loại ghế $seat_type->name";
                    break;
            }

            $seat_type->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('SeatTypeController@changeLevelSeatType: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listSeatTypeInTrash()
    {
        try {
            $seat_type = SeatType::query()->where('level','hide')->get();

            return response()->json([
                'data' => $seat_type
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/SeatTypeController@listSeatTypeInTrash: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
