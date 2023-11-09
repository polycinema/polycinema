<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class MovieController extends Controller
{
    /**
     *  Get list movie
     *
     */

    public function index()
    {
        try {
            $movies = Movie::query()->where('release_date', '<=', now())->with('genres')->get();

            return response()->json([
                'data' => $movies
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/MovieController@index:, '[$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *   Get the movie detail with relation
     *   Param string $id
     */

    public function show(string $id)
    {
        try {
            $movie = Movie::query()->with('actors')->with('genres')->find($id);

            if (!$movie) {
                return response()->json([
                    'message' => 'NOT FOUND'
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'data' => $movie
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/MovieController@show: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
