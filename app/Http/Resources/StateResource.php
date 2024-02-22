<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Clients;
use App\Models\Image;

class StateResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $clients = Clients::all();
        $owner = $clients->where('id',$this->client_id)->first();
        $image = Image::where('state_id', $this->id)->get();
        return [
            'id' => $this->id,
            'client_id' => $this->client_id,
            'owner'=> $owner,
            'short_description' => $this->short_description,
            'situation' => $this->situation,
            'avaliable' => $this->avaliable,
            'street' => $this->street,
            'state_number' => $this->number,
            'neighbor' => $this->neighbor,
            'city' => $this->city,
            'cep' => $this->cep,
            'path_image' => $image,
            'aux_image' => [],
            'long_description' => $this->description,
            'created_at' => $this->created_at->format('d-m-Y'),
            'clients' => $clients
        ];
    }
}
