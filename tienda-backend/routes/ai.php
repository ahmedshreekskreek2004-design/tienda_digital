<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AiChatController;

Route::post('/ai/chat', [AiChatController::class, 'chat']);
