<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\State;
use App\Models\Image;
use App\Models\Clients;
use Illuminate\Http\Request;
use App\Http\Resources\StateResource;
use App\Http\Requests\StateRequest;
use App\Http\Requests\StateRequestEdit;
use Illuminate\Support\Facades\Storage;
use App\Jobs\storeImagesAwsS3;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Optional;

class StateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $itemsPerPage = 10;
        $currentPage = $request->page ?? 1;
        $offset = ($currentPage - 1) * $itemsPerPage;

        $data = DB::table('states')->offset($offset)->limit($itemsPerPage)->get();

        $totalItems = DB::table('states')->count();

        return response()->json([
            'data' => $data,
            'currentPage' => $currentPage,
            'itemsPerPage' => $itemsPerPage,
            'totalItems' => $totalItems
        ]);
    }

    /**
     * return the search from table states.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request) {
        $searchTerm = $request->input('searchTerm');
        $results = DB::table('states')
                ->where('street', 'LIKE', '%'.$searchTerm.'%')
                // ->orWhere('short_description', 'LIKE', '%'.$searchTerm.'%')
                ->orWhere('neighbor', 'LIKE', '%'.$searchTerm.'%')
                ->get();
        
        return $results;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        dd("Create");
        // $imovel new StateResource($state);
        $clients = Clients::all();
        return $clients;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StateRequest $request)
    {
        //Storage::put('text.txt', 'olá mundo');
        $images = $request->file('images');
        $data = $request->validated();
        $state = new State();
        /**S3 access
         * bucket name: laravel-aws-bucket-imob
         * ap-south-1AWS_ACCESS_KEY_ID=AKIATBOJFMUOKS5SH66J
            AWS_SECRET_ACCESS_KEY=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
            AWS_DEFAULT_REGION=ap-south-1
            AWS_BUCKET=laravel-aws-bucket-imob
         */
        

        try {
            $state->client_id = $data['client_id'];
            $state->short_description = $data['short_description'];
            $state->situation = $data['situation'];
            $state->avaliable = $data['avaliable'];
            $state->street = $data['street'];
            $state->number = $data['state_number'];
            $state->neighbor = $data['neighbor'];
            $state->city = $data['city'];
            $state->cep = $data['cep'];
            $state->description = $data['long_description'];
            $state->save();
        } catch (\Throwable $th) {
            throw $th;
        }
        $state_id = $state->id;
        /**
         * saving s3 url images in each row of table images
         * each row has state_id as a reference
         */
        foreach ($images as $image) {

            // Generate a unique file name using the original file name and a random string
            $filename = Str::random(40) . '.' . $image->getClientOriginalName();
            try {
                $path = Storage::putFileAs('public/state', $image, $filename, 'public');
                $url = Storage::url($path);
            } catch (\Throwable $th) {
                return $th;
            }                
            //get the public image url
            $url = Storage::url($path);
            Image::create([
                'state_id' => $state_id,
                'path' => $path,
                'url' => $url,
            ]);
        }
        return response()->json(["status" => "success", "message" => 'storage successfull:)']);
        

        //return response(new StateResource($state) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\State  $state
     * @return \Illuminate\Http\Response
     */
    public function stateShow($id)
    {
        $state = State::where('id', $id)->first();
        $owner = Clients::find($state->client_id)->first();
        $image = Image::where('state_id', $state->id)->get();
        $data = [
            'id' => $state->id,
            'owner'=> $owner,
            'short_description' => $state->short_description,
            'situation' => $state->situation,
            'avaliable' => $state->avaliable,
            'street' => $state->street,
            'state_number' => $state->number,
            'neighbor' => $state->neighbor,
            'city' => $state->city,
            'cep' => $state->cep,
            'path_image' => $image,
            'long_description' => $state->description,
            'created_at' => $state->created_at->format('d-m-Y'),
        ];
        return response()->json(["status" => "success", "message" => 'stateShow successfull:)', "data" => $data]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\State  $state
     * @return \Illuminate\Http\Response
     */
    public function edit(State $state)
    {
        //
    }

    public function stupdate(StateRequestEdit $request){
        $images = $request->file('images');
        //return $images[0]->getMimeType();
        $data = $request->validated();
        $state = State::find($data['id'])->first();

        try {
            $state->client_id = $data['client_id'];
            $state->short_description = $data['short_description'];
            $state->situation = $data['situation'];
            $state->avaliable = $data['avaliable'];
            $state->street = $data['street'];
            $state->number = $data['state_number'];
            $state->neighbor = $data['neighbor'];
            $state->city = $data['city'];
            $state->cep = $data['cep'];
            $state->description = $data['long_description'];
            $state->save();
        } catch (\Throwable $th) {
            throw $th;
        }
        $state_id = $state->id;
        /**
         * saving s3 url images in each row of table images
         * each row has state_id as a reference
         */
        if(isset($images)){
            foreach ($images as $image) {

                // Generate a unique file name using the original file name and a random string
                $filename = Str::random(40) . '.' . $image->getClientOriginalName();
                try {
                    $path = Storage::putFileAs('public/state', $image, $filename, 'public');
                    $url = Storage::url($path);
                } catch (\Throwable $th) {
                    return $th;
                }                
                //get the public image url
                $url = Storage::url($path);
                Image::create([
                    'state_id' => $state_id,
                    'path' => $path,
                    'url' => $url,
                ]);
            }
        }
        return response()->json(["status" => "success", "message" => 'storage successfull:)']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\State  $state
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, State $state)
    {
        Log::debug($request->all()); // Log all input data to the Laravel log file
        return $request->file('images');
        // return response()->json([
        //     'message' => 'State updated successfully',
        //     'data' =>$request // return the updated State model
        // ]);
        //Storage::put('text.txt', 'olá mundo');
        $images = $request->file('images');
        $data = $request->all();
        //$data = $request->validated();
        //$state = State::find($data['id'])->first();
        /**S3 access
         * bucket name: laravel-aws-bucket-imob
         * ap-south-1AWS_ACCESS_KEY_ID=AKIATBOJFMUOKS5SH66J
            AWS_SECRET_ACCESS_KEY=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
            AWS_DEFAULT_REGION=ap-south-1
            AWS_BUCKET=laravel-aws-bucket-imob
        */


        try {
            $state->client_id = $data['client_id'];
            $state->short_description = $data['short_description'];
            $state->situation = $data['situation'];
            $state->avaliable = $data['avaliable'];
            $state->street = $data['street'];
            $state->number = $data['state_number'];
            $state->neighbor = $data['neighbor'];
            $state->city = $data['city'];
            $state->cep = $data['cep'];
            $state->description = $data['long_description'];
            $state->save();
        } catch (\Throwable $th) {
            throw $th;
        }
        $state_id = $state->id;
        /**
         * saving s3 url images in each row of table images
         * each row has state_id as a reference
         */
        if(isset($images)){
            foreach ($images as $image) {

                // Generate a unique file name using the original file name and a random string
                $filename = Str::random(40) . '.' . $image->getClientOriginalName();
                try {
                    $path = Storage::putFileAs('public/state', $image, $filename, 'public');
                    $url = Storage::url($path);
                } catch (\Throwable $th) {
                    return $th;
                }                
                //get the public image url
                $url = Storage::url($path);
                Image::create([
                    'state_id' => $state_id,
                    'path' => $path,
                    'url' => $url,
                ]);
            }
        }
        return response()->json(["status" => "success", "message" => 'storage successfull:)']);
    }

    public function show($id)
    {
        $state = State::find($id)->first();
        return response(new StateResource($state) , 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\State  $state
     * @return \Illuminate\Http\Response
     */
    public function destroy(State $state)
    {
        if (Image::where('state_id', $state->id)->exists()) {
            $filePaths = Image::where('state_id', $state->id)->get();
            foreach ($filePaths as $filePath) {
                //delete from s3
                Storage::delete($filePath->path);
                //delete from database
                $filePath->delete();
            }
        }         
        $state->delete();

        return response("Model deleted", 204);
    }

    /**
     * Remove the specified resource from s3.
     *
     * @param  \App\Models\State  $state
     * @return \Illuminate\Http\Response
     */
    public function destroyImages(Request $request)
    {
        $image = Image::where('id',$request->id)->first();
        //delete from s3
        Storage::delete($image->path);
        //delete from database
        $image->delete();

        return response(["message"=>"Image deleted", 204]);
    }
}
