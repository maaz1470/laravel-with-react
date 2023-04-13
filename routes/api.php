<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\CategoryController;

Route::post('/register',[AuthController::class, 'registration'])->name('auth.registration');
Route::post('/login_store',[AuthController::class, 'login_storage'])->name('auth.login_storage');
Route::middleware(['auth:sanctum','ApiAdmin'])->group(function(){
    Route::get('/checkAuthentication',function(){
        return Response()->json([
            'status'    => 200,
            'message'   => 'Login Successfully'
        ]);
    });
    Route::post('/logout',[AuthController::class, 'logout'])->name('auth.logout');
    Route::post('/category_store',[CategoryController::class, 'add_category'])->name('category.add');
    Route::get('/get-all-categories',[CategoryController::class, 'all_categories']);
    Route::get('/get-category-using-id/{id}',[CategoryController::class, 'getCategoryUsingId']);
    Route::post('/update-category/{id}',[CategoryController::class, 'updateCategory']);
    Route::get('/delete-category/{id}',[CategoryController::class, 'deleteCategory']);
    Route::get('/get-product-page-category',[CategoryController::class, 'getProductPageCategory']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
