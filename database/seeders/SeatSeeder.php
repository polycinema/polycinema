<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('seats')->insert([
            'seat_name' => 'a1',
            'type' => 'single',
            'room_id' => 1
        ]);

        DB::table('seats')->insert([
            'seat_name' => 'a2',
            'type' => 'single',
            'room_id' => 1
        ]);

        DB::table('seats')->insert([
            'seat_name' => 'a3',
            'type' => 'single',
            'room_id' => 1
        ]);

        DB::table('seats')->insert([
            'seat_name' => 'a4',
            'type' => 'single',
            'room_id' => 1
        ]);

        DB::table('seats')->insert([
            'seat_name' => 'a5',
            'type' => 'single',
            'room_id' => 1
        ]);
    }
}
