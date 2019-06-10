<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


/* Route::(method)('/path/', ControllerFileName@methodToExecute'); */


Route::get('/', 'LoginController@index');

//Route::post('/login', 'LoginController@login');

Route::post('/register', 'RegisterController@register');


Route::post('/','PrestartController@store'); /*method from php controller */
Route::post('/intrants', 'InventaireController@store');
Route::post('/categorie', 'CategorieController@store');
Route::get('/data', 'PrestartController@p');






Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
