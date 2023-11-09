<?php

use App\Http\Controllers\API\Auth\AuthenController;
use App\Http\Controllers\API\V1\MovieController;
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

    Route::get('user', function(Request $request) {
        return $request->user();
    });
});

Route::prefix('v1')->group(function () {

    include(base_path('routes/admin.php'));

    Route::get('movies', [MovieController::class, 'index'])->name('movies.index');

    Route::get('movies/{id}', [MovieController::class, 'show'])->name('movies.show');
});
