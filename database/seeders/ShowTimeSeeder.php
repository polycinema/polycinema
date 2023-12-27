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
            'room_id' => 1,
            'show_date' => Carbon::now()->tomorrow(),
            'start_time' => '17:30:00',
            'end_time' => '18:30:00',
        ]);
    }
}
