<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        if ($products) {
            return response()->json([
                'data' => $products,
                'message' => 'Danh sách sản phẩm'
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
        if ($request->isMethod('POST')) {
            $product = new Product();

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $filename = $request->file('image')->getClientOriginalName();
                $image = $request->file('image')->storeAs('products_img', $filename, 'public');
            }

            $product->name = $request->name;
            $product->image = $image;
            $product->price = $request->price;

            $result = $product->save();


            if($result){
                return response()->json([
                    'data' => $product,
                    'message' => 'Thêm sản phẩm thành công'
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
            $product = Product::find($id);

            if ($product) {
                return response()->json([
                    'data' => $product,
                    'message' => "Thông tin sản phẩm $product->name"
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Sản phẩm không tồn tại'
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
            $product = Product::find($id);
            $destination = public_path('storage\\' . $product->image);

            $filename = "";
            if ($request->hasFile('new_image') && $request->file('new_image')->isValid()) {
                if(File::exists($destination)){
                    File::delete($destination);
                }
                $filename = $request->file('new_image')->store('products_img', 'public');
            } else {
                $filename = $request->image;     
            }

            $product->name = $request->name;
            $product->image = $filename;
            $product->price = $request->price;
            
            $result = $product->save();

            if($result){
                return response()->json([
                    'data' => $product,
                    'message' => 'Sửa sản phẩm thành công'
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
            $product = Product::find($id);

            if ($product) {
                $deleted = $product->delete();

                if ($deleted) {
                    return response()->json([
                        'data' => $product,
                        'message' => "Đã xóa thành công sản phẩm $product->name"
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
                    'message' => 'Ghế không tồn tại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }
}
