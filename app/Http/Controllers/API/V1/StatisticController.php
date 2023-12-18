<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Booking;
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

            $bookingCount = Booking::whereDate('created_at', $today)->count();

            $totalRevenue = Booking::whereDate('created_at', $today)->sum('total_price');

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
                ->groupBy('date')
                ->get();

            // create new array with default value is 0, set all day off week is the last 7 days
            $result = [];
            $totalRevenue = 0;
            foreach ($allDaysLast7Days as $day) {
                $booking = $weeklyBookings->firstWhere('date', $day);

                // total revenue a day
                // $revenue = Booking::whereDate('created_at', $day)->sum('total_price');
                $revenue = (int) Booking::whereDate('created_at', $day)->sum('total_price');

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
                ->groupBy('date')
                ->get();

            // Create a new array with default value is 0 for all days in the last 28 days
            $result = [];
            $totalRevenue = 0;

            foreach ($allDaysLast28Days as $day) {
                $booking = $dailyBookings->firstWhere('date', $day);

                // Total revenue a day
                $revenue = (int) Booking::whereDate('created_at', $day)->sum('total_price');

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
                ->groupBy('month')
                ->get();

            // Create a new array with default values as 0 for all months in the last 12 months
            $result = [];
            $totalRevenue = 0;

            foreach ($allMonthsLast12Months as $month) {
                $booking = $monthlyBookings->firstWhere('month', $month);

                // Total revenue for a month
                $revenue = (int) Booking::whereMonth('created_at', Carbon::parse($month)->month)
                    ->sum('total_price');

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
}
