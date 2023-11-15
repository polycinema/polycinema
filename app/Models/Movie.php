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
    ];

    public function director() {
        return $this->belongsTo(Director::class);
    }

    public function actors() {
        return $this->belongsToMany(Actor::class, 'movie_actors');
    }

    public function genres() {
        return $this->belongsToMany(Genre::class, 'movie_genres');
    }

    public function showTime() {
        return $this->belongsTo(ShowTime::class);
    }
}
