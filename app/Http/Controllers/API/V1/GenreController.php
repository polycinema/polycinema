<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class GenreController extends Controller
{
    // Ẩn hiện Genre 
    public function changeLevelGenre(Request $request)
    {
        // Post request id Genre
        try {
            $genre = Genre::find($request->genre_id);

            $level_genre = $genre->level;

            switch ($level_genre) {
                case Genre::LEVEL_HIDE:
                    $genre->level = Genre::LEVEL_SHOW;
                    $message = "Đã khôi phục danh mục $genre->name";
                    break;
                case Genre::LEVEL_SHOW:
                    $genre->level = Genre::LEVEL_HIDE;
                    $message = "Đã ẩn danh mục $genre->name";
                    break;
            }

            $genre->save();

            return response()->json([
                'message' => $message
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('GenreController@changeLevelGenre: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listGenreInTrash()
    {
        try {
            $genres = Genre::query()->where('level','hide')->get();

            return response()->json([
                'data' => $genres
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/GenreController@listGenreInTrash: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
