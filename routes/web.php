<?php

use Illuminate\Support\Facades\Route;



Route::prefix('auth')->group(function(){
    Route::name('auth.')->group(function(){
        Route::get('/dashboard',function(){
            return view('backend.backend');
        })->name('dashboard');
        Route::get('/login',function(){
            return view('backend.backend');
        })->name('login');
        Route::get('/register',function(){
            return view('backend.backend');
        })->name('register');
        Route::get('/add-category',function(){
            return view('backend.backend');
        });
        Route::get('/all-categories',function(){
            return view('backend.backend');
        });
        Route::get('/edit-category/{id}',function(){
            return view('backend.backend');
        });
        Route::get('/add-product',function(){
            return view('backend.backend');
        });

    });
});
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
