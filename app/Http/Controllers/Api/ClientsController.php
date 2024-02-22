<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;
use App\Http\Resources\ClientsResource;
use App\Http\Requests\ClientsRequest;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{
    public function index(Request $request)
    {
        $itemsPerPage = 10;
        $currentPage = $request->page ?? 1;
        $offset = ($currentPage - 1) * $itemsPerPage;

        $data = DB::table('clients')->offset($offset)->limit($itemsPerPage)->get();

        $totalItems = DB::table('clients')->count();

        return response()->json([
            'data' => $data,
            'currentPage' => $currentPage,
            'itemsPerPage' => $itemsPerPage,
            'totalItems' => $totalItems
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClientsRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $client = Clients::create($data);

        return response(new ClientsResource($client) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(Clients $client)
    {
        return new ClientsResource($client);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(ClientsRequest $request, Clients $client)
    {
        $data = $request->validated();
        $client->update($data);

        // return new UserResource($client);
        return response("Model Client Updated", 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Clients $client)
    {
        $client->delete();

        return response("", 204);
    }
}
