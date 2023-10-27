<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DirectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('directors')->insert([
            'name' => 'Jame Gun',
            'image' => ''
        ]);

        DB::table('directors')->insert([
            'name' => 'Zack Snyder',
            'image' => ''
        ]);

        DB::table('directors')->insert([
            'name' => 'Steven Spielberg	',
            'image' => ''
        ]);

        DB::table('directors')->insert([
            'name' => 'Russo Brother',
            'image' => ''
        ]);

        DB::table('directors')->insert([
            'name' => 'Michael Bay',
            'image' => ''
        ]);
    }

    
}
