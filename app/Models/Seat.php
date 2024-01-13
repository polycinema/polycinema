<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Seat extends Model
{
    use HasFactory, SoftDeletes;

    const TYPE = [
        'single' => 60000,
        'double' => 110000,
        'special' => 135000
    ];

    const UNBOOK = 'unbook';
    const BOOKED = 'booked';
    const BOOKING = 'booking';

    protected $fillable = [
        'seat_name',
        'showtime_id',
        // 'type',
        'seat_type_id',
        'status',
        'price',
        'user_id',
        'booking_id'
    ];

    public function showtime()
    {
        return $this->belongsTo(ShowTime::class, 'showtime_id');
    }

    public function booking(): BelongsTo {
        return $this->belongsTo(Booking::class);
    }

    public function seatType(): BelongsTo{
        return $this->belongsTo(SeatType::class);
    }
}
