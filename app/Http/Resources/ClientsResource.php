<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\State;

class ClientsResource extends JsonResource
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
        $states = State::where('client_id', $this->id)->select('id','street', 'number')->get();
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'cpf' => $this->cpf,
            'rg' => $this->rg,
            'contact' => $this->contact,
            'contact_alternative' => $this->contact_alternative,
            'street' => $this->street,
            'number' => $this->number,
            'neighbor' => $this->neighbor,
            'city' => $this->city,
            'cep' => $this->cep,
            'created_at' => $this->created_at->format('d-m-Y'),
            'states' => $states
        ];
    }
}
