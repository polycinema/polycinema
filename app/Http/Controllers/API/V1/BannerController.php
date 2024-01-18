<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $banners = Banner::query()->get();

            return response()->json([
                'data' => $banners
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BannerController@index: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getBannersHomeScreen()
    {
        try{
            $banners = Banner::query()->where('status', Banner::ACTIVE)->get();

            return response()->json([
                'data' => $banners
            ], Response::HTTP_OK);
        }catch(Exception $exception) {
            Log::error('BannerController@getBannersHomeScreen: ', [$exception->getMessage()]);

            return response()->json([
                'messagge' => 'Đã có lỗi nghiêm trọng xảy ra'
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->fails()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $banner = new Banner();

            $banner->fill($request->all());

            $banner->save();

            return response()->json([
                'data'      => $banner,
                'message'   => 'Đã thêm thành công'
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BannerController@store: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner)
    {
        try {
            return response()->json([
                'data' => $banner
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BannerController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->fails()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $banner->fill($request->all());

            $banner->save();

            return response()->json([
                'data'      => $banner,
                'message'   => 'Sửa thành công'
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('BannerController@update: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner)
    {
        try {
            $banner->delete();

            return response()->json([], Response::HTTP_NO_CONTENT);
        } catch (Exception $exception) {
            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
