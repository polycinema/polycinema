<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Movie;
use App\Models\Seat;
use App\Models\ShowTime;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StatisticController extends Controller
{

    /**
     *
     * @func getStatisticInDay
     * get the booking in current day
     */

    public function getStatisticInDay()
    {
        try {
            $today = now()->toDateString();

            $bookingCount = Booking::whereDate('created_at', $today)->where('status', '!=', 'cancel')->count();

            $totalRevenue = Booking::whereDate('created_at', $today)->where('status', '!=', 'cancel')->sum('total_price');

            return response()->json([
                'data' => [
                    'booking_count' => $bookingCount,
                    'total_revenue' => $totalRevenue
                ]
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getStatisticInDay: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getStatisticInLast7Days()
    {
        try {
            // $today = now()->toDateString();
            $startOfLast7Days = now()->subDays(6)->startOfDay(); //Start date is last 7 days
            $endOfToday = now()->endOfDay();

            $allDaysLast7Days = [];
            $currentDay = clone $startOfLast7Days;
            while ($currentDay <= $endOfToday) {
                $allDaysLast7Days[] = $currentDay->toDateString();
                $currentDay->addDay();
            }

            $weeklyBookings = Booking::whereBetween('created_at', [$startOfLast7Days, $endOfToday])
                ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as booking_count'))
                ->where('status', '!=', 'cancel')
                ->groupBy('date')
                ->get();

            // create new array with default value is 0, set all day off week is the last 7 days
            $result = [];
            $totalRevenue = 0;
            foreach ($allDaysLast7Days as $day) {
                $booking = $weeklyBookings->firstWhere('date', $day);

                // total revenue a day
                // $revenue = Booking::whereDate('created_at', $day)->sum('total_price');
                $revenue = (int) Booking::whereDate('created_at', $day)->where('status', '!=', 'cancel')->sum('total_price');

                $result[] = [
                    'date' => $day,
                    'booking_count' => $booking ? $booking->booking_count : 0,
                    'revenue' => $revenue
                ];

                $totalRevenue += $revenue;
            }

            // $weeklyBookings = $weeklyBookings->map(function ($item) {
            //     $item->day_name = Carbon::parse($item->date)->format('l');
            //     return $item;
            // });

            return response()->json([
                'data' => [
                    'daily_bookings' => $result,
                    'total_revenue' => $totalRevenue
                ]
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getStatisticInWeek: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getStatisticInLast28Days()
    {
        try {
            $startOfLast28Days = now()->subDays(27)->startOfDay(); // Start date is last 28 days
            $endOfToday = now()->endOfDay();

            $allDaysLast28Days = [];
            $currentDay = clone $startOfLast28Days;
            while ($currentDay <= $endOfToday) {
                $allDaysLast28Days[] = $currentDay->toDateString();
                $currentDay->addDay();
            }

            $dailyBookings = Booking::whereBetween('created_at', [$startOfLast28Days, $endOfToday])
                ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as booking_count'))
                ->where('status', '!=', 'cancel')
                ->groupBy('date')
                ->get();

            // Create a new array with default value is 0 for all days in the last 28 days
            $result = [];
            $totalRevenue = 0;

            foreach ($allDaysLast28Days as $day) {
                $booking = $dailyBookings->firstWhere('date', $day);

                // Total revenue a day
                $revenue = (int) Booking::whereDate('created_at', $day)->where('status', '!=', 'cancel')->sum('total_price');

                $result[] = [
                    'date' => $day,
                    'booking_count' => $booking ? $booking->booking_count : 0,
                    'revenue' => $revenue
                ];

                $totalRevenue += $revenue;
            }

            return response()->json([
                'data' => [
                    'daily_bookings' => $result,
                    'total_revenue' => $totalRevenue
                ]
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getStatisticInMonth: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getStatisticInYear()
    {
        try {
            $currentYear = now()->year();
            $startOfLast12Months = now()->subMonths(11)->startOfMonth(); // Start date is last 12 months
            $endOfMonth = now()->endOfMonth();

            $allMonthsLast12Months = [];
            $currentMonth = clone $startOfLast12Months;
            while ($currentMonth <= $endOfMonth) {
                $allMonthsLast12Months[] = $currentMonth->format('Y-m');
                $currentMonth->addMonth();
            }

            $monthlyBookings = Booking::whereBetween('created_at', [$startOfLast12Months, $endOfMonth])
                ->select(DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'), DB::raw('count(*) as booking_count'))
                ->where('status', '!=', 'cancel')
                ->groupBy('month')
                ->get();

            // Create a new array with default values as 0 for all months in the last 12 months
            $result = [];
            $totalRevenue = 0;

            foreach ($allMonthsLast12Months as $month) {
                $booking = $monthlyBookings->firstWhere('month', $month);

                // Total revenue for a month
                $revenue = (int) Booking::whereMonth('created_at', Carbon::parse($month)->month)
                    ->where('status', '!=', 'cancel')->sum('total_price');

                $result[] = [
                    'date' => $month,
                    'booking_count' => $booking ? $booking->booking_count : 0,
                    'revenue' => $revenue
                ];

                $totalRevenue += $revenue;
            }

            return response()->json([
                'data' => [
                    'daily_bookings' => $result,
                    'total_revenue' => $totalRevenue
                ]
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getStatisticInMonth: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // get Statistic trong khoảng ngày $request->from đến $request->to
    public function getStatisticInRange(Request $request)
    {
        try {
            // $fromDay = $request->from;
            // $toDay = $request->to;

            // // Lấy dữ liệu số lượng booking và doanh thu từ $fromDay đến $toDay
            // $bookings = Booking::select(DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as date'), DB::raw('COUNT(*) as booking_count'), DB::raw('SUM(total_price) as revenue'))
            //     ->whereBetween('created_at', [$fromDay, $toDay])
            //     ->groupBy('date')
            //     ->orderBy('date')
            //     ->get();

            // $dailyBookings = [];

            // $currentDate = $fromDay;
            // while ($currentDate <= $toDay) {
            //     $booking = $bookings->firstWhere('date', $currentDate);

            //     $dailyBookings[] = [
            //         'date' => $currentDate,
            //         'booking_count' => $booking ? $booking->booking_count : 0,
            //         'revenue' => $booking ? $booking->revenue : "0",
            //     ];

            //     $currentDate = date('Y-m-d', strtotime($currentDate . ' + 1 day'));
            // }

            // // Tính tổng doanh thu
            // $totalRevenue = $bookings->sum('revenue');

            // return response()->json([
            //     'data' => [
            //         'daily_bookings' => $dailyBookings,
            //         'total_revenue' => $totalRevenue,
            //     ],
            // ], Response::HTTP_OK);

            $fromDay = $request->from;
            $toDay = $request->to;

            // Lấy dữ liệu số lượng booking và doanh thu từ $from đến $to
            $bookingData = DB::table('bookings')
                ->select(DB::raw('DATE_FORMAT(created_at, "%Y-%m-%d") as date'), DB::raw('COUNT(*) as booking_count'), DB::raw('CAST(SUM(total_price) AS CHAR) as revenue'))
                ->where('status', '!=', 'cancel')
                ->whereBetween('created_at', [$fromDay, $toDay])
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            // Tạo mảng dữ liệu hàng ngày
            $dailyBookings = [];
            $currentDate = $fromDay;
            while ($currentDate <= $toDay) {
                $booking = $bookingData->firstWhere('date', $currentDate);

                $dailyBookings[] = [
                    'date' => $currentDate,
                    'booking_count' => $booking ? $booking->booking_count : 0,
                    'revenue' => $booking ? $booking->revenue : "0",
                ];

                $currentDate = date('Y-m-d', strtotime($currentDate . ' + 1 day'));
            }

            // Tính tổng doanh thu
            $totalRevenue = $bookingData->sum('revenue');

            return response()->json([
                'data' => [
                    'daily_bookings' => $dailyBookings,
                    'total_revenue' => $totalRevenue,
                ],
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getStatisticInRange: ', [$exception->getMessage()]);
        }
    }

    public function getTopMoviesByRevenue()
    {
        try {
            $topMovies = DB::table('bookings')
                ->select('movies.id', 'movies.title', 'movies.name', 'movies.image', 'movies.trailer', 'movies.description', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status', DB::raw('SUM(bookings.total_price) as total_revenue'))
                ->join('show_times', 'bookings.showtime_id', '=', 'show_times.id')
                ->join('movies', 'show_times.movie_id', '=', 'movies.id')
                ->groupBy('movies.id', 'movies.title', 'movies.name', 'movies.image', 'movies.trailer', 'movies.description', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status') // Liệt kê tất cả các trường từ bảng movies ở đây
                ->orderByDesc('total_revenue')
                ->limit(10)
                ->get();

            return response()->json([
                'data' => $topMovies,
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getTopMoviesByRevenue: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getStatisticByMovie(string $movie_id)
    {
        try {
            $movie = Movie::query()->where('id', $movie_id)->with('actors')->with('genres')->with('director')->get();
            if (!$movie) {
                return response()->json([
                    'message' => 'Phim không tồn tại'
                ], Response::HTTP_OK);
            }

            $bookings = Booking::whereHas('showtime', function ($query) use ($movie_id) {
                $query->where('movie_id', $movie_id);
            })->get();

            $bookings_show = Booking::whereHas('showtime', function ($query) use ($movie_id) {
                $query->where('movie_id', $movie_id);
            })
                // ->with('showtime')->with('user')
                ->where('level', 'show')
                ->get();


            // đếm số lượng booking
            $count = $bookings->count();
            // Tổng doanh thu
            $total_price = collect($bookings)->where('status', '!=', 'cancel')->sum('total_price');
            // Tổng đơn hàng đã lấy vé
            $satisfied = collect($bookings)->where('status', 'satisfied')->count();
            // Tổng đơn hàng không lấy vé
            $not_yet = collect($bookings)->where('status', 'not_yet')->count();
            // Tổng đơn hàng hủy vé
            $cancel = Booking::query()->where('status', 'cancel')->count();
            // Tổng đơn hàng ẩn
            $hide = Booking::query()->where('level', 'hide')->count();

            return response()->json([
                'movie' => $movie,
                'bookings' => $bookings_show,
                'total_booking' => $count,
                'total_price' => $total_price,
                'status_not_yet' => $not_yet,
                'status_satisfied' => $satisfied,
                'status_cancel' => $cancel,
                'hide' => $hide,
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getStatisticByMovie: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTopMovieHaveHighestRevenue()
    {
        try {
            $topMovie = Movie::with(['director', 'actors', 'genres'])
                ->select('movies.id', 'movies.name', 'movies.title', 'movies.image', 'movies.trailer', 'movies.description', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status', DB::raw('SUM(CASE WHEN bookings.status != "cancel" THEN bookings.total_price ELSE 0 END) as total_revenue'))
                ->join('show_times', 'show_times.movie_id', '=', 'movies.id')
                ->join('bookings', 'show_times.id', '=', 'bookings.showtime_id')
                ->groupBy('movies.id', 'movies.name', 'movies.title', 'movies.image', 'movies.trailer', 'movies.description', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status')
                ->orderByDesc('total_revenue')
                ->first();

            return response()->json([
                'data' => $topMovie,
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getStatisticByMovie: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTop10MoviesHaveHighestView()
    {
        try {
            $topMovies = Movie::with(['director', 'actors', 'genres'])
                ->select('movies.id', 'movies.name', 'movies.title', 'movies.image', 'movies.trailer', 'movies.description', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status', DB::raw('COUNT(bookings.id) as views'))
                ->join('show_times', 'show_times.movie_id', '=', 'movies.id')
                ->join('bookings', 'show_times.id', '=', 'bookings.showtime_id')
                ->where('bookings.status', 'satisfied')
                ->groupBy('movies.id', 'movies.name', 'movies.title', 'movies.image', 'movies.trailer', 'movies.description', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status')
                ->orderByDesc('views')
                ->limit(10)
                ->get();

            return response()->json([
                'data' => $topMovies
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getTop10MoviesHaveHighestView: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getTop5UserHaveHighestBooking()
    {
        try {
            $users = User::whereHas('bookings')
                ->withCount('bookings')
                ->where('status', '!=', 'cancel')
                ->withSum('bookings', 'total_price')
                ->orderBy('bookings_count', 'desc')
                ->limit(5)
                ->get();


            return response()->json([
                'data' => $users
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getTop5UserHaveHighestBooking: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getAllMoviesSortedByTotalPrice()
    {
        try {
            $movies = Movie::
                // with(['director', 'actors', 'genres'])
                select('movies.id', 'movies.name', 'movies.title', 'movies.image', 'movies.trailer', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status', DB::raw('SUM(bookings.total_price) as total_revenue'),  DB::raw('COUNT(bookings.id) as total_booking'))
                ->join('show_times', 'show_times.movie_id', '=', 'movies.id')
                ->join('bookings', 'show_times.id', '=', 'bookings.showtime_id')
                ->groupBy('movies.id', 'movies.name', 'movies.title', 'movies.image', 'movies.trailer', 'movies.description', 'movies.release_date', 'movies.duration', 'movies.director_id', 'movies.status')
                ->orderByDesc('total_revenue')
                ->get();

            return response()->json([
                'data' => $movies,
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@getAllMoviesSortedByTotalPrice: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function dashBoard()
    {
        try {
            // Lấy ngày hôm nay
            $today = Carbon::today();
                
            $new_users = User::whereDate('created_at', $today)->count();
            $new_bookings = Booking::whereDate('created_at', $today)->get();
            $count_new_bookings = $new_bookings->count();
            $showtimes_today = ShowTime::whereDate('created_at', $today)
                ->with(['movie' => function ($query) {
                    $query->select('id', 'title', 'image');
                }])
                ->with(['room' => function ($query) {
                    $query->select('id', 'room_name');
                }])
                ->get();

            $count_showtimes_today = $showtimes_today->count();
            $total_revenue_today = Booking::whereDate('created_at', $today)->where('status', '!=', 'cancel')->sum('total_price');

            $toDay = now()->toDateString();
            // lấy ra 5 người dùng đã đặt vé ngày hôm nay sắp xếp theo total_price từ lớn tới bé
            $users = User::
                join('bookings', 'users.id', '=', 'bookings.user_id')
                ->whereDate('bookings.created_at', $toDay)
                ->where('bookings.status', '!=', 'cancel')
                ->select('users.id', 'users.name', 'users.image')
                ->selectRaw('COUNT(bookings.id) as bookings_count')
                ->selectRaw('SUM(bookings.total_price) as bookings_sum_total_price')
                ->groupBy('users.id', 'users.name')
                ->orderByDesc('bookings_sum_total_price', 'decs')
                ->limit(5)
                ->get();

            return response()->json([
                'new_users' => $new_users,
                'users_bookings' => $users,
                // 'new_booking' => $new_bookings,
                'count_new_bookings' => $count_new_bookings,
                'showtimes_today' => $showtimes_today,
                'count_showtimes' => $count_showtimes_today,
                'total_revenue_today' => $total_revenue_today,
            ], Response::HTTP_OK);
        } catch (Exception $exception) {
            Log::error('StatisticController@dashBoard: ', [$exception->getMessage()]);

            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
