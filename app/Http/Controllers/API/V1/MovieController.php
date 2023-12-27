<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Genre;
use App\Models\Movie;
use App\Models\MovieGenre;
use App\Models\Seat;
use App\Models\ShowTime;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
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
            $movies = Movie::query()->where('release_date', '<=', now())
                ->with('genres')
                ->with('showTimes')
                ->get();

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

    public function getShowTimeByMovie($movieId)
    {
        try {
            $movie_name = Movie::find($movieId)->name;

            $currentDate = Carbon::now()->toDateString();

            $showTimes = DB::table('show_times as t1')
                ->join('show_times as t2', function ($join) use ($movieId) {
                    $join->on('t1.movie_id', '=', 't2.movie_id')
                        ->on('t1.show_date', '=', 't2.show_date')
                        ->where('t1.id', '<>', 't2.id')
                        ->where('t2.movie_id', '=', $movieId);
                })
                ->whereDate('t1.show_date', '>=', $currentDate)
                ->select('t1.*')
                ->distinct()
                ->get();

            $groupedData = collect($showTimes)->groupBy('show_date')->map(function ($items) {
                return $items->values();
            })->toArray();

            // $formattedData = [
            //     'data' => array_values($groupedData)
            // ];

            $responseData = [];

            foreach ($groupedData as $date => $data) {
                $showtimes = [];
                foreach ($data as $showtime) {
                    $showtimeSeats = Seat::where('showtime_id', $showtime->id)->get();
                    $availableSeats = $showtimeSeats->where('status', 'unbook')->count();

                    $showtimes[] = [
                        'showtime' => $showtime,
                        'available_seats' => $availableSeats
                    ];
                }

                $responseData[] = [
                    'date' => $date,
                    'showtimes' => $showtimes
                ];
            }
            return response()->json([
                'data' => $responseData,
                'message' => "Danh Sách Lịch Chiếu Phim $movie_name"
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/MovieController@getShowTimeByMovie: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getShowtimes()
    {
        try {

            $showtimes = ShowTime::query()
                ->with(['movie', 'room'])
                ->select('show_times.*')
                ->selectRaw('(SELECT COUNT(*) FROM seats WHERE seats.showtime_id = show_times.id AND seats.status = "unbook") AS available_seat')
                ->get();

            $result = [];

            foreach ($showtimes as $showtime) {


                $genre = MovieGenre::where('movie_id', $showtime->movie->id)->select('genre_id')->get();

                $genres = Genre::whereIn('id', $genre)->select('name')->get();

                $result[$showtime->show_date][] = [
                    'showtime_id' => $showtime->id,
                    'movie' => $showtime->movie,
                    'room' => $showtime->room,
                    'start_time' => $showtime->start_time,
                    'end_time' => $showtime->end_time,
                    'available_seat' => $showtime->available_seat,
                    'genre' => $genres,
                ];
            }

            $response = [];

            foreach ($result as $show_date => $showtimes) {
                $response[] = [
                    'show_date' => $show_date,
                    'showtime' => $showtimes,
                ];
            }

            return response()->json([
                'data' => $response
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            Log::error("MovieController@getShowtimes: ", [$e->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
