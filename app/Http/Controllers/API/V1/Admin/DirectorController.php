<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\DirectorRequest;
use App\Models\Director;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DirectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $directors = Director::query()->where('level','show')->get();

        if ($directors) {
            return response()->json([
                'data' => $directors,
                'message' => 'Danh sách đạo diễn'
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
        try {
           $validator = Validator::make($request->all(), [
                'name' => 'required',
                'image' => 'required|string',
            ], [
                'name.required' => 'Trường tên đạo diễn không được trống',
                'image.required' => 'Ảnh tải lên không hợp lệ',
                'image.string' => 'Ảnh không hợp lệ',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            if ($request->isMethod('POST')) {
                $director = new Director();

                // if ($request->hasFile('image') && $request->file('image')->isValid()) {
                //     $filename = time() . '_' . $request->file('image')->getClientOriginalName();
                //     $image = $request->file('image')->storeAs('directors_img', $filename, 'public');
                // }

                $director->fill($request->all());

                $director->save();


                if ($director->save()) {
                    return response()->json([
                        'data' => $director,
                        'message' => "Thêm đạo diễn $director->name thành công"
                    ], Response::HTTP_OK);
                } else {
                    return response()->json([
                        'error' => 'Đã có lỗi xảy ra',
                        'message' => 'Truy vấn thất bại'
                    ], Response::HTTP_INTERNAL_SERVER_ERROR);
                }
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/DirectorController@store:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Director $director)
    {
        try {
            return response()->json([
                'data' => $director,
                'message' => "Thông tin đạo diễn $director->name"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/DirectorController@show:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Director $director)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'image' => 'required|string',
            ], [
                'name.required' => 'Trường tên đạo diễn không được trống',
                'image.required' => 'Ảnh tải lên không hợp lệ',
                'image.string' => 'Ảnh không hợp lệ',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // if ($request->hasFile('image') && $request->file('image')->isValid()) {
            //     if (Storage::exists($director->image)) {
            //         Storage::delete($director->image);
            //     }

            //     $originalname = time() . '_' . $request->file('image')->getClientOriginalName();
            //     $filename = $request->file('image')->storeAs('directors_img', $originalname, 'public');
            // } else {
            //     $filename = $director->image;
            // }

            // $director->name = $request->name;
            // $director->image = $filename;

            // $result = $director->save();
            $director->fill($request->all());

            $director->save();

            if ($director->save()) {
                return response()->json([
                    'data' => $director,
                    'message' => "Sửa thông tin đạo diễn $director->name thành công"
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Truy vấn thất bại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/DirectorController@update:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Director $director)
    {
        if ($director) {
            // if (Storage::exists($director->image)) {
            //     Storage::delete($director->image);
            // }

            $deleted = $director->delete();

            if ($deleted) {
                return response()->json([
                    'data' => $director,
                    'message' => "Đã xóa thành công đạo diễn $director->name"
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
                'message' => 'Đạo diễn không tồn tại'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
