<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::middleware('auth:sanctum')->post('/orders/add',[OrderController::class, 'addToOrder']);
