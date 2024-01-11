<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    // Ẩn hiện Product
    public function changeLevelProduct(Request $request)
    {
        // Post request id Product
        try {
            $product = Product::find($request->product_id);

            $level_product = $product->level;

            switch ($level_product) {
                case Product::LEVEL_HIDE:
                    $product->level = Product::LEVEL_SHOW;
                    $message = "Đã khôi phục sản phẩm $product->name";
                    break;
                case Product::LEVEL_SHOW:
                    $product->level = Product::LEVEL_HIDE;
                    $message = "Đã ẩn sản phẩm $product->name";
                    break;
            }

            $product->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('ProductController@changeLevelProduct: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listProductInTrash()
    {
        try {
            $products = Product::query()->where('level','hide')->get();

            return response()->json([
                'data' => $products
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/ProductController@listProductInTrash: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
