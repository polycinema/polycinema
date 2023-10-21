<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'image' => 'required|image',
                'price' => 'required|numeric'
            ], [
                'name.required' => 'Trường tên sản phẩm không được trống',
                'image.required' => 'Trường ảnh sản phẩm không được trống',
                'image.image' => 'Ảnh sản phẩm không phù hợp!',
                'price.required' => 'Trường giá sản phẩm không được để trống',
                'price.numeric' => 'Trường giá sản phẩm phải là số nguyên'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors()
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $product = new Product();

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $filename = time() . '_' . $request->file('image')->getClientOriginalName();
                $image = $request->file('image')->storeAs('products_img', $filename, 'public');
            }

            $product->name = $request->name;
            $product->image = $image;
            $product->price = $request->price;

            $result = $product->save();


            if ($result) {
                return response()->json([
                    'data' => $product,
                    'message' => 'Thêm sản phẩm thành công'
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Truy vấn thất bại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ProductController@store:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            return response()->json([
                'data' => $product,
                'message' => "Thông tin sản phẩm $product->name"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ProductController@show:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|',
                'image' => 'image',
                'price' => 'required|numeric'
            ], [
                'name.required' => 'Trường tên sản phẩm không được trống',
                'image.image' => 'Ảnh sản phẩm không phù hợp!',
                'price.required' => 'Trường giá sản phẩm không được để trống',
                'price.numeric' => 'Trường giá sản phẩm phải là số nguyên'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                if (Storage::exists($product->image)) {
                    Storage::delete($product->image);
                }

                $originalname = time() . '_' . $request->file('image')->getClientOriginalName();
                $filename = $request->file('image')->storeAs('products_img', $originalname, 'public');
            } else {
                $filename = $product->image;
            }

            $product->name = $request->name;
            $product->image = $filename;
            $product->price = $request->price;


            $result = $product->save();

            if ($result) {
                return response()->json([
                    'data' => $product,
                    'message' => "Sửa thông tin sản phẩm $product->name thành công"
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'error' => 'Đã có lỗi xảy ra',
                    'message' => 'Truy vấn thất bại'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        } catch (Exception $exception) {
            Log::error('API/V1/Admin/ProductController@update:', [$exception->getMessage()]);

            return response()->json([
                'error' => 'Đã có lỗi xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if (Storage::exists($product->image)) {
            Storage::delete($product->image);
        }

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
    }
}
