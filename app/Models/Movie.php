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
        'director_id',
        'status',
        'level'
    ];

    CONST LEVEL_HIDE = 'hide';
    CONST LEVEL_SHOW = 'show';

    public function director() {
        return $this->belongsTo(Director::class);
    }

    public function actors() {
        return $this->belongsToMany(Actor::class, 'movie_actors');
    }

    public function genres() {
        return $this->belongsToMany(Genre::class, 'movie_genres');
    }

    public function showTimes() {
        return $this->hasMany(ShowTime::class);
    }
}
