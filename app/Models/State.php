<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'short_description',
        'situation',
        'avaliable',
        'street',
        'number',
        'neighbor',
        'city',
        'cep',
        'path_image',
        'description'
    ];
}
