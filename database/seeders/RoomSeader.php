<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeader extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('rooms')->insert([
            'room_name' => 'A - 1',
            'single_seat' => 30,
            'double_seat' => 20,
            'special_seat' => 10,
            // 'single_seat_price' => 60000,
            // 'double_seat_price' => 110000,
            // 'special_seat_price' => 135000,
            'capacity' => 60
        ]);
        DB::table('rooms')->insert([
            'room_name' => 'A - 2',
            'single_seat' => 30,
            'double_seat' => 20,
            'special_seat' => 10,
            // 'single_seat_price' => 60000,
            // 'double_seat_price' => 110000,
            // 'special_seat_price' => 135000,
            'capacity' => 60
        ]);
        DB::table('rooms')->insert([
            'room_name' => 'A - 3',
            'single_seat' => 30,
            'double_seat' => 20,
            'special_seat' => 10,
            // 'single_seat_price' => 60000,
            // 'double_seat_price' => 110000,
            // 'special_seat_price' => 135000,
            'capacity' => 60
        ]);
    }

}
