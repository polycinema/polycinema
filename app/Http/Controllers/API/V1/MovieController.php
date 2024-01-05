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
            // $currentTime = Carbon::now()->toTimeString();

            $showTimes = DB::table('show_times as t1')
                ->join('show_times as t2', function ($join) use ($movieId) {
                    $join->on('t1.movie_id', '=', 't2.movie_id')
                        ->on('t1.show_date', '=', 't2.show_date')
                        // ->on('t1.start_time', '=', 't2.start_time')
                        ->where('t1.id', '<>', 't2.id')
                        ->where('t2.movie_id', '=', $movieId);
                })
                ->whereDate('t1.show_date', '>=', $currentDate)
                // ->whereTime('t1.start_time', '>=', $currentTime)
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
            // ngày hiện tại
            $currentDate = date('Y-m-d');

            // sắp xếp lại sao cho đối tượng có 'date' gần với ngày hôm nay nhất
            usort($responseData, function ($a, $b) use ($currentDate) {
                $dateA = strtotime($a['date']);
                $dateB = strtotime($b['date']);
            
                if ($dateA == $dateB) {
                    return 0;
                }
            
                return abs(strtotime($currentDate) - $dateA) < abs(strtotime($currentDate) - $dateB) ? -1 : 1;
            });

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
            $currentDate = Carbon::now()->toDateString();

            $showtimes = ShowTime::query()
                ->has('movie')
                ->has('room')
                ->with(['movie', 'room'])
                ->select('show_times.*')
                ->selectRaw('(SELECT COUNT(*) FROM seats WHERE seats.showtime_id = show_times.id AND seats.status = "unbook") AS available_seat')
                ->whereDate('show_date', '>=', $currentDate)
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

            // ngày hiện tại
            $yearMonthDay = date('Y-m-d');

            // sắp xếp lại sao cho đối tượng có 'show_date' gần với ngày hôm nay nhất
            usort($response, function ($a, $b) use ($yearMonthDay) {
                $dateA = strtotime($a['show_date']);
                $dateB = strtotime($b['show_date']);
            
                if ($dateA == $dateB) {
                    return 0;
                }
            
                return abs(strtotime($yearMonthDay) - $dateA) < abs(strtotime($yearMonthDay) - $dateB) ? -1 : 1;
            });

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

    // Lấy những Movie có ShowTime để list lên trang chủ
    public function getMovieHaveShowTime()
    {
        try {
            $currentDate = Carbon::now();
            $yesterday = Carbon::now()->yesterday();

            $moviesScreening = Movie::query()
                ->has('showtimes')
                ->whereHas('showtimes', function ($query) use ($currentDate) {
                    $query->whereDate('show_date', '>=', $currentDate);
                })
                // ->with(['showtimes' => function ($query) use ($currentDate) {
                //     $query->whereDate('show_date', '>=', $currentDate);
                // }])
                ->get();

            $yesterdayMovies = Movie::query()
                ->has('showtimes')
                ->whereHas('showtimes', function ($query) use ($yesterday) {
                    $query->whereDate('show_date', '=', $yesterday);
                })
                // ->with(['showtimes' => function ($query) use ($yesterday) {
                //     $query->whereDate('show_date', '=', $yesterday);
                // }])
                ->get();

            return response()->json([
                'screening' => $moviesScreening, // phim đang chiếu 
                'yesterday_movie' => $yesterdayMovies // phim đã chiếu ngày hôm qua
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('API/V1/MovieController@getMovieHaveShowTime: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
