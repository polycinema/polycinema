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
            ['name' => 'single', 'price' => 60000, 'image' => 'https://res.cloudinary.com/dbktpvcfz/image/upload/v1705311712/images/foo7oryphk9xxflcd512.png'],
            ['name' => 'double', 'price' => 110000, 'image' => 'https://res.cloudinary.com/dbktpvcfz/image/upload/v1705308805/images/ubfalmubxoubdezigcgr.png'],
            ['name' => 'special', 'price' => 135000, 'image' => 'https://res.cloudinary.com/dbktpvcfz/image/upload/v1705257868/images/iinnxwnpznljycxvjwp1.png']
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
