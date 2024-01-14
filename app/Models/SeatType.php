<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeatType extends Model
{
    use HasFactory;

    protected $table = 'seat_types';

    protected $fillable = [
        'name',
        'price',
        'image'
    ];

    public function rooms(): BelongsToMany{
        return $this->belongsToMany(Room::class, 'room_seat_types');
    }
}
