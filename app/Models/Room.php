<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'room_name',
        'single_seat',
        'double_seat',
        'special_seat',
        'capacity',
    ];

    public function showtimes(): HasMany
    {
        return $this->hasMany(ShowTime::class);
    }

    public function seatTypes(): BelongsToMany
    {
        return $this->belongsToMany(SeatType::class, 'room_seat_types', 'room_id', 'seat_type_id')
            ->withPivot('quantity');
    }
}
