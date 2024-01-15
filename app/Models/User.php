<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use HasRoles, SoftDeletes;

    const CUSTOMER = 'user';
    const ADMIN = 'admin';

    const BANNED = 'banned';
    const NORMAL = 'normal';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'full_name',
        'image',
        'email',
        'password',
        'role',
        'phone',
        'date_of_birth',
        'gender',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class, 'users');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function sendPasswordResetNotification($token): void
    {
        $url = 'http://localhost:3000/reset-password?token=' . $token;

        $this->notify(new ResetPasswordNotification($url));
    }
}
