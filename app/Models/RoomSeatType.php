<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomSeatType extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'seat_type_id',
        'quantity'
    ];
}
