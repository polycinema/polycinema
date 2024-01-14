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
            ['name' => 'single', 'price' => 60000, 'image' => 'null'],
            ['name' => 'double', 'price' => 110000, 'image' => 'null'],
            ['name' => 'special', 'price' => 135000, 'image' => 'null']
        ];

        foreach ($seatTypes as $seatType) {
            SeatType::updateOrCreate(
                [
                    'name' => $seatType['name'],
                    'price' => $seatType['price'],
                    'image' => $seatType['image']
                ],
                [
                    'name' => $seatType['name'],
                    'price' => $seatType['price'],
                    'image' => $seatType['image']
                ]
            );
        }
    }
}
