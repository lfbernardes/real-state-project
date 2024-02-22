<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ClientsController;
use App\Http\Controllers\Api\StateController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\DashBoardController;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/clients/get', function () {
        return Clients::all();
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/clients', ClientsController::class);
    Route::apiResource('/states', StateController::class);
    Route::post('/states/search', [StateController::class, 'search']);
    Route::post('/states/stupdate', [StateController::class, 'stupdate']);
    Route::get('/states/show/{id}', [StateController::class, 'stateShow']);
    Route::post('/states/delete-images', [StateController::class, 'destroyImages']);
    Route::apiResource('/schedules', ScheduleController::class);
    Route::post('/appointments', [ScheduleController::class, 'appointment']);
    //dashboard
    Route::get('/dashboard', [DashBoardController::class, 'index']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
