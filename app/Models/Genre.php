<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Genre extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'level'
    ];
    
    CONST LEVEL_HIDE = 'hide';
    CONST LEVEL_SHOW = 'show';

    public function movies() {
        return $this->belongsToMany(Movie::class, 'movie_genres');
    }
}
