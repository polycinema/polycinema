<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('banners')->insert([
            'name' => 'http://res.cloudinary.com/dbktpvcfz/image/upload/v1703693791/images/b28qt6oi4tavj2ekrmjl.png',
        ]);

        DB::table('banners')->insert([
            'name' => 'http://res.cloudinary.com/dbktpvcfz/image/upload/v1703693814/images/wojrb2ek9oqszm37jfd9.jpg',
        ]);

        DB::table('banners')->insert([
            'name' => 'http://res.cloudinary.com/dbktpvcfz/image/upload/v1703693853/images/umpqakavimhxqtrsm3sq.jpg',
        ]);
    }
}
