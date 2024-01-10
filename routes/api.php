<?php

use App\Http\Controllers\API\Auth\AuthenController;
use App\Http\Controllers\API\V1\ActorController;
use App\Http\Controllers\API\V1\Admin\UserController;
use App\Http\Controllers\API\V1\BookingController;
use App\Http\Controllers\API\V1\CouponController;
use App\Http\Controllers\API\V1\DirectorController;
use App\Http\Controllers\API\V1\MovieController;
use App\Http\Controllers\API\V1\NewpasswordController;
use App\Http\Controllers\API\V1\SeatController;
use App\Http\Controllers\API\V1\ProfileController;
use App\Http\Controllers\API\V1\ShowTimeController;
use App\Http\Controllers\API\V1\StatisticController;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthenController::class, 'register'])->name('register');
Route::post('login', [AuthenController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthenController::class, 'logout']);

    Route::get('user', function (Request $request) {
        return $request->user();
    });
});

Route::prefix('v1')->group(function () {

    include(base_path('routes/admin.php'));

    Route::resource('/count', SeatController::class);

    Route::get('movies', [MovieController::class, 'index'])->name('movies');

    Route::get('movies/{id}', [MovieController::class, 'show'])->name('movies.detail');

    Route::get('showtimes/{movie_id}', [MovieController::class, 'getShowTimeByMovie'])->name('showtime');

    Route::get('seats/{showtime_id}', [SeatController::class, 'getSeatShowTime'])->name('seats');

    Route::post('bookings', [BookingController::class, 'store'])->name('bookings.save');

    Route::post('update-profile', [ProfileController::class, 'updateProfile']);

    Route::post('vnpay-charge', [BookingController::class, 'createVNPayPayment']);

    Route::post('seat-reservation/{seat_id}', [BookingController::class, 'updateSeatReservation']);

    Route::get('showtimes', [MovieController::class, 'getShowtimes']);

    Route::get('bookings', [BookingController::class, 'index']);

    Route::get('statistc-in-day', [StatisticController::class, 'getStatisticInDay']);

    Route::get('statistic-in-week', [StatisticController::class, 'getStatisticInLast7Days']);

    Route::get('statistic-in-month', [StatisticController::class, 'getStatisticInLast28Days']);

    Route::get('statistic-in-year', [StatisticController::class, 'getStatisticInYear']);

    Route::get('all-available-coupons/{user_id}', [CouponController::class, 'getAvailableCouponsByUser']);

    Route::post('user-do-using-coupon', [CouponController::class, 'userUsingCoupon']);

    Route::post('satisfied-booking/{booking_id}', [BookingController::class, 'setStatusBookingToSatisfied']);

    Route::post('not-yet-booking/{booking_id}', [BookingController::class, 'setStatusBookingToNotYet']);

    Route::get('bookings/{id}', [BookingController::class, 'show']);

    Route::get('bookings/user/{userId}', [BookingController::class, 'bookingsByUser']);

    Route::get('get-movie-have-showtime', [MovieController::class, 'getMovieHaveShowTime']);

    Route::post('statistc-in-range', [StatisticController::class, 'getStatisticInRange']);

    Route::get('top-movies', [StatisticController::class, 'getTopMoviesByRevenue']);

    Route::post('forgot-password', [NewpasswordController::class, 'forgotPassword']);

    Route::post('reset-password', [NewpasswordController::class, 'reset']);

    Route::get('statistc-by-movie/{movie_id}', [StatisticController::class, 'getStatisticByMovie']);
    // hide và show booking
    Route::post('change-level-booking', [BookingController::class, 'changeLevelBooking']);
    // tìm booking theo booking_id (không phải là id của bảng bookings)
    Route::post('find-booking', [BookingController::class, 'findBookingByBookingID']);

    Route::get('top1-movie', [StatisticController::class, 'getTopMovieHaveHighestRevenue']);

    // Lấy tất cả booking level = hide ( Trong thùng rác )
    Route::get('booking-in-trash', [BookingController::class, 'getBookingInTrash']);

    Route::get('top10-movies-by-view', [StatisticController::class, 'getTop10MoviesHaveHighestView']);

    Route::get('users-admin', [UserController::class, 'getAdminUser']);

    Route::get('customers', [UserController::class, 'getCustomers']);

    Route::get('get-booking-by-bookingid/{booking_id}', [BookingController::class, 'getBookingByBookingID']);
    // hide và show showtime
    Route::post('change-level-showtime', [ShowTimeController::class, 'changeLevelShowTime']);
    // hide và show movie
    Route::post('change-level-movie', [MovieController::class, 'changeLevelMovie']);
    // hide và show coupon
    Route::post('change-level-coupon', [CouponController::class, 'changeLevelCoupon']);
    // hide và show actor
    Route::post('change-level-actor', [ActorController::class, 'changeLevelActor']);
    // Tìm Actor theo tên
    Route::post('search-actor', [ActorController::class, 'searchActorByName']);
    // hide và show Director
    Route::post('change-level-director', [DirectorController::class, 'changeLevelDirector']);
    // Tìm Actor theo tên
    Route::post('search-director', [DirectorController::class, 'searchDirectorByName']);
});
