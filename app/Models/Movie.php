<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'image',
        'trailer',
        'description',
        'release_date',
        'duration',
        'director_id'
    ];
}