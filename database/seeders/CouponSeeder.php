<?php

namespace Database\Seeders;

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
            'expires_at' => '2024/12/12',
        ]);

        DB::table('coupons')->insert([
            'coupon_code' => '1STPOLY',
            'description' => 'Giảm Giá Cực Vip',
            'type' => 'discount_amount',
            'discount' => '50000',
            'expires_at' => '2024/12/12',
        ]);

        DB::table('coupons')->insert([
            'coupon_code' => 'POLYCINEMA',
            'description' => 'Giảm Giá Cực Đã',
            'type' => 'discount_percentage',
            'discount' => '20',
            'expires_at' => '2024/12/12',
        ]);

        DB::table('coupons')->insert([
            'coupon_code' => 'POLYOPEN',
            'description' => 'Giảm Giá Cực Sốc',
            'type' => 'discount_amount',
            'discount' => '70000',
            'expires_at' => '2024/12/12',
        ]);
    }
}
