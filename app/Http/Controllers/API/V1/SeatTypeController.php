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
            $seatTypes = SeatType::query()->get();

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
                'image' => 'required'
            ], [
                'name.required' => 'Vui lòng nhập tên loại ghế',
                'price.required' => 'Vui lòng nhập giá',
                'image.required' => 'Vui lòng chọn ảnh'
            ]);

            if ($validator->fails()) {
                return response([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $seatType = new SeatType();

            $seatType->fill($request->all());

            $seatType->save();

            return response()->json([
                'message' => 'Thêm mới thành công'
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
                'name' => 'required',
                'price' => 'required',
                'image' => 'required'
            ], [
                'name.required' => 'Vui lòng nhập tên loại ghế',
                'price.required' => 'Vui lòng nhập giá',
                'image.required' => 'Vui lòng chọn ảnh'
            ]);

            if ($validator->fails()) {
                return response([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $seatType->fill($request->all());

            $seatType->save();

            return response()->json([
                'message' => 'Thêm mới thành công'
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
}
