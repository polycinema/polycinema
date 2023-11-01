<?php

namespace App\Http\Controllers\API\V1\Movie;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\ShowTime;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    public function getShowtimeWithMovie($id){
        
        $showtime = ShowTime::find($id);
        
        $movie_id = $showtime->movie_id;

        $movie = Movie::find($movie_id);
        return response()->json([
            'data' => [
                'movie' => $movie,
                'showtime' => $showtime
            ],
        ], Response::HTTP_OK);      
    }
}
