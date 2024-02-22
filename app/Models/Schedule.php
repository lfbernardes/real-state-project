<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable=[
        'title',
        'initial_date',
        'end_date',
        'initial_time',
        'end_time',
        'description'
    ];
    protected $table = 'schedule';
}
