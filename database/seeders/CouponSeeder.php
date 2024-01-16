<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('coupons')->insert([
            'coupon_code' => 'POLY128',
            'description' => 'Giảm Giá Cực Khủng',
            'type' => 'discount_percentage',
            'discount' => '40',
            'start_at' => Carbon::now()->today(),
            'expires_at' => Carbon::now()->nextWeekendDay(),
            'quantity' => '100',
            'min_order_value' => NULL
        ]);

        DB::table('coupons')->insert([
            'coupon_code' => '1STPOLY',
            'description' => 'Giảm Giá Cực Vip',
            'type' => 'discount_amount',
            'discount' => '50000',
            'start_at' => Carbon::now()->today(),
            'expires_at' => Carbon::now()->nextWeekendDay(),
            'quantity' => '100',
            'min_order_value' => 200000
        ]);

        DB::table('coupons')->insert([
            'coupon_code' => 'POLYCINEMA',
            'description' => 'Giảm Giá Cực Đã',
            'type' => 'discount_percentage',
            'discount' => '20',
            'start_at' => Carbon::now()->today(),
            'expires_at' => Carbon::now()->nextWeekendDay(),
            'quantity' => '100',
            'min_order_value' => 300000
        ]);

        DB::table('coupons')->insert([
            'coupon_code' => 'POLYOPEN',
            'description' => 'Giảm Giá Cực Sốc',
            'type' => 'discount_amount',
            'discount' => '70000',
            'start_at' => Carbon::now()->today(),
            'expires_at' => Carbon::now()->nextWeekendDay(),
            'quantity' => '100',
            'min_order_value' => NULL
        ]);
    }
}
