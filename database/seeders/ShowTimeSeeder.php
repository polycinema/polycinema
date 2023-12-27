<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShowTimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('show_times')->insert([
            'movie_id' => 1,
            'room_id' => 2,
            'show_date' => Carbon::now()->tomorrow(),
            'start_time' => '13:00:00',
            'end_time' => '15:00:00',
        ]);

        DB::table('show_times')->insert([
            'movie_id' => 2,
            'room_id' => 1,
            'show_date' => Carbon::now()->yesterday(),
            'start_time' => '06:00:00',
            'end_time' => '08:00:00',
        ]);

        DB::table('show_times')->insert([
            'movie_id' => 3,
            'room_id' => 2,
            'show_date' => Carbon::now()->tomorrow(),
            'start_time' => '09:00:00',
            'end_time' => '11:00:00',
        ]);
    }
}
