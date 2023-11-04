<?php

namespace Database\Seeders;

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
            'movie_id' => 2,
            'room_id' => 2,
            'show_date' => '2023/11/04',
            'start_time' => '17:30:00',
            'end_time' => '18:30:00',
        ]);

        DB::table('show_times')->insert([
            'movie_id' => 1,
            'room_id' => 1,
            'show_date' => '2023/11/03',
            'start_time' => '18:45:00',
            'end_time' => '19:30:00',
        ]);
    }
}
