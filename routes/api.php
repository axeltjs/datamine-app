<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

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

Route::middleware('auth:passport')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
    Route::get('task/list', [TaskController::class, 'index'])->name('task.list');
    Route::post('task/create', [TaskController::class, 'create'])->name('task.create');
    Route::put('task/update/{id}', [TaskController::class, 'update'])->name('task.update');
    Route::put('task/checklist/{id}', [TaskController::class, 'checklist'])->name('task.checklist');
    Route::delete('task/delete/{id}', [TaskController::class, 'destroy'])->name('task.delete');
});
