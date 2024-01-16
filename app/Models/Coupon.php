<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Coupon extends Model
{
    use HasFactory;

    protected $fillable = [
        'coupon_code',
        'description',
        'type',
        'discount',
        'start_at',
        'expires_at',
        'quantity',
        'min_order_value' ,
        'level'
    ];

    // fields const
    const COUPON_CODE = 'coupon_code';
    const TYPE = 'type';
    const DISCOUNT = 'discount';

    const INTERGER = 'discount_amount';
    const PERCENT = 'discount_percentage';
    const ONE_HUNDERED = 100 ;
    const ONE = 1 ;
    const EMPTY = "" ;

    CONST LEVEL_HIDE = 'hide';
    CONST LEVEL_SHOW = 'show';
    
    public function users(){
         return $this->belongsToMany(User::class , 'coupon_bookings' );
    }
}
