<?php

use App\Http\Controllers\JobController;
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

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::controller(JobController::class)->group(function () {
    Route::get('/properties', 'getProperties');
    Route::get('/users', 'getUsers');
    Route::post('/store-job', 'storeJob');
    Route::get('/jobs', 'getJobs');
});
//Route::get('/properties', [JobController::class, 'getProperties']);

