<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',

        then: function () {
            Route::middleware('api')
                ->group(base_path('routes/auth.php'));

            Route::middleware('api')
                ->group(base_path('routes/product.php'));
                Route::middleware('api')
    ->group(base_path('routes/orderChoose.php'));

                Route::middleware('api')
    ->group(base_path('routes/buy.php'));

    Route::middleware('api')
    ->group(base_path('routes/ai.php'));
        },

        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
