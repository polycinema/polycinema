<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShowTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        'room_id',
        'show_date',
        'start_time',
        'end_time',
    ];

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
