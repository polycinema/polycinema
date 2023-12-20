<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'booking_id',
        'showtime_id',
        'total_price'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_bookings')
            ->withPivot('quantity');
    }

    public function seats(): HasMany
    {
        return $this->hasMany(Seat::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function showtime(): BelongsTo
    {
        return $this->belongsTo(showtime::class);
    }
}
