<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

use function PHPSTORM_META\type;

class Seat extends Model
{
    use HasFactory, SoftDeletes;

    const TYPE = [
        'single' => 60000,
        'double' => 110000,
        'special' => 135000
    ];

    protected $fillable = [
        'seat_name',
        'type',
        // 'room_id',
        'showtime_id',
        'status',
        'price',
        'user_id'
    ];

    public function showtime()
    {
        return $this->belongsTo(ShowTime::class, 'showtime_id');
    }
}
