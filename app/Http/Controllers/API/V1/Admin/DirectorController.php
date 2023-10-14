<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\DirectorRequest;
use App\Models\Director;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class DirectorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $directors = Director::all();

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
    public function store(DirectorRequest $request)
    {
        if ($request->isMethod('POST')) {
            $director = new Director();

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $filename = $request->file('image')->getClientOriginalName();
                $image = $request->file('image')->storeAs('directors_img', $filename, 'public');
            }

            $director->name = $request->name;
            $director->image = $image;

            $result = $director->save();


            if($result){
                return response()->json([
                    'data' => $director,
                    'message' => "Thêm đạo diễn $director->name thành công"
                ],Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Truy vấn thất bại'
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
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
        if($id){
            $director = Director::find($id);

            if ($director) {
                return response()->json([
                    'data' => $director,
                    'message' => "Thông tin đạo diễn $director->name"
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Đạo diễn không tồn tại'
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
            $director = Director::find($id);
            $destination = public_path('storage\\' . $director->image);

            $filename = "";
            if ($request->hasFile('new_image') && $request->file('new_image')->isValid()) {
                if(File::exists($destination)){
                    File::delete($destination);
                }
                $filename = $request->file('new_image')->store('directors_img', 'public');
            } else {
                $filename = $request->image;     
            }

            $director->name = $request->name;
            $director->image = $filename;
            
            $result = $director->save();

            if($result){
                return response()->json([
                    'data' => $director,
                    'message' => "Sửa thông tin đạo diễn $director->name thành công"
                ],Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Truy vấn thất bại'
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
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
        if($id){
            $directors = Director::find($id);

            if ($directors) {
                $deleted = $directors->delete();

                if ($deleted) {
                    return response()->json([
                        'data' => $directors,
                        'message' => "Đã xóa thành công đạo diễn $directors->name"
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
}
