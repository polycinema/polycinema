<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            'name' => 'Combo 1',
            'image' => '',
            'price' => 80000
        ]);

        DB::table('products')->insert([
            'name' => 'Combo 2',
            'image' => '',
            'price' => 120000
        ]);

        DB::table('products')->insert([
            'name' => 'Combo 3',
            'image' => '',
            'price' => 150000
        ]);
    }
}
