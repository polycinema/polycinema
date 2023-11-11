<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Seat extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'seat_name',
        'type',
        'room_id',
    ];
    public function room() {
        return $this->belongsTo(Room::class, 'room_id');
    }
}

