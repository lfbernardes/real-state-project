<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clients extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'name',
        'email',
        'cpf',
        'rg',
        'contact',
        'contact_alternative',
        'street',
        'number',
        'neighbor',
        'city',
        'cep'
    ];
}
