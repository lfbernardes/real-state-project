<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Models\State;
use App\Models\Image;
use Illuminate\Http\Request;
use App\Jobs\storeImagesAwsS3;

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

Route::get('/', function () {
    return view('welcome');
});
Route::post('s3', function(Request $request ){
    
    // dd($request->file());
    $images = $request->file();//$data['path_image'];
    $i = 0;
    dd($images);
    foreach ($images as $image) {
        // dd($image);
        storeImagesAwsS3::dispatch($image); 
        $i++;           
    }
    dd($i);
});
