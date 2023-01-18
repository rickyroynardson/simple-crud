<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TokenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\PersonalAccessToken;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix(env('API_VERSION', 'v1'))->group(function () {
    Route::get('/health', function () {
        return response()->json(['message' => 'Server is running normal', 'status' => 200], 200);
    });

    Route::controller(AuthController::class)->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');
    });

    // protected with access token route
    Route::middleware('auth:sanctum', 'abilities:access_token')->group(function () {
        Route::get('/example', function () {
            return response()->json(['message' => 'OK'], 200);
        });
    });

    // refresh token route
    Route::controller(TokenController::class)->group(function () {
        Route::get('/refresh', 'refresh');
    });
});
