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
        // 'single_seat_price',
        // 'double_seat_price',
        // 'special_seat_price',
        'capacity',
    ];

    CONST LEVEL_HIDE = 'hide';
    CONST LEVEL_SHOW = 'show';

    public function showtimes(): HasMany
    {
        return $this->hasMany(ShowTime::class);
    }
}
