<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class   ShowTime extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'movie_id',
        'room_id',
        'show_date',
        'start_time',
        'end_time',
        'level'
    ];

    CONST LEVEL_HIDE = 'hide';
    CONST LEVEL_SHOW = 'show';

    public function room(){
        return $this->belongsTo(Room::class);
    }

    public function seats() {
        return $this->hasMany(Seat::class,'showtime_id');
    }

    public function movie() {
        return $this->belongsTo(Movie::class,'movie_id');
    }
}
