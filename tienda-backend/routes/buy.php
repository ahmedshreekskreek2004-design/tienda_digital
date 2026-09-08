<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderBuyController;

Route::middleware('auth:sanctum')->post('/orders/buy',[OrderBuyController::class, 'buy']);
Route::middleware('auth:sanctum')->post('/orders/confirm',[OrderBuyController::class, 'confirm']);
