<?php

namespace Database\Seeders;

use App\Models\SeatType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeatTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seatTypes = [
            ['name' => 'single', 'price' => 60000],
            ['name' => 'double', 'price' => 110000],
            ['name' => 'special', 'price' => 135000]
        ];

        foreach ($seatTypes as $seatType) {
            SeatType::updateOrCreate(
                [
                    'name' => $seatType['name'],
                    'price' => $seatType['price']
                ],
                [
                    'name' => $seatType['name'],
                    'price' => $seatType['price']
                ]
            );
        }
    }
}
