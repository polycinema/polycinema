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
            'capacity' => 60
        ]);
        DB::table('rooms')->insert([
            'room_name' => 'A - 2',
            'capacity' => 60
        ]);
        DB::table('rooms')->insert([
            'room_name' => 'A - 3',
            'capacity' => 60
        ]);
    }

}
