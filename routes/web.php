<?php

// use Illuminate\Foundation\Application;

use App\Http\Controllers\RegisterAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Dashboard', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('home');
    Route::get('/account/security', function () {
        return Inertia::render('Account/Security');
    })->name('account.security');
});

Route::get('/register', [RegisterAdminController::class, 'create'])
    ->middleware(['guest'])
    ->name('register');
