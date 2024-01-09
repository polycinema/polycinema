<?php

namespace Database\Seeders;

use App\Models\Seat;
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
        for ($i = 1; $i <= 50; $i++) {
            if ($i > 45) {
                $type = 1;
                $price = Seat::TYPE['special'];
            } elseif ($i > 35 && $i <= 45) {
                $type = 2;
                $price = Seat::TYPE['double'];
            } else {
                $type = 3;
                $price = Seat::TYPE['single'];
            }
            Seat::create([
                'seat_name' => 'A'.$i,
                'seat_type_id' => $type,
                'showtime_id' => 1,
                'status' => 'unbook',
                'price' => $price,
                'user_id' => NULL,
                'booking_id' => NULL,
            ]);
        }

    }
}
