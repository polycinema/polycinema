<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SeatType extends Model
{
    use HasFactory;

    protected $table = 'seat_types';

    protected $fillable = [
        'name',
        'price',
        'image',
        'level'
    ];

    CONST LEVEL_HIDE = 'hide';
    CONST LEVEL_SHOW = 'show';

    public function rooms(): BelongsToMany{
        return $this->belongsToMany(Room::class, 'room_seat_types');
    }
}
