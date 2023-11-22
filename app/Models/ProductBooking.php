<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductBooking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'product_id',
        'quantity',
    ];
}
