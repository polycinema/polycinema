<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'booking_id',
        'showtime_id',
        'total_price',
        'coupon_code',
        'status',
        'level'
    ];

    CONST SATISFIED = 'satisfied';
    CONST NOT_YET = 'not_yet';
    CONST CANCEL = 'cancel';
    CONST LEVEL_HIDE = 'hide';
    CONST LEVEL_SHOW = 'show';

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
