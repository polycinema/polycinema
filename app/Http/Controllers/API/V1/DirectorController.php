<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Director;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class DirectorController extends Controller
{
    // Ẩn hiện Director 
    public function changeLevelDirector(Request $request)
    {
        // Post request id Director
        try {
            $director = Director::find($request->director_id);

            $level_director = $director->level;

            switch ($level_director) {
                case Director::LEVEL_HIDE:
                    $director->level = Director::LEVEL_SHOW;
                    $message = "Đã khôi phục đạo diễn $director->name";
                    break;
                case Director::LEVEL_SHOW:
                    $director->level = Director::LEVEL_HIDE;
                    $message = "Đã ẩn đạo diễn $director->name";
                    break;
            }

            $director->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('DirectorController@changeLevelDirector: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Tìm kiếm Director theo name
    public function searchDirectorByName(Request $request)
    {
        try {
            $director = Director::where('name', 'LIKE', '%' . $request->director_name . '%')
                ->where('level', 'show')
                ->get();

            if ($director->isEmpty()) {
                return response()->json([
                    'message' => "Không tồn tại diễn viên $request->director_name"
                ], Response::HTTP_OK);
            }

            return response()->json([
                'data' => $director
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('DirectorController@searchDirectorByName: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listDirectorInTrash()
    {
        try {
            $directors = Director::query()->where('level', 'hide')->get();

            return response()->json([
                'data' => $directors
            ], Response::HTTP_OK);
        } catch (\Exception $exception) {
            Log::error('API/V1/DirectorController@listDirectorInTrash: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
