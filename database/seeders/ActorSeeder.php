<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('actors')->insert([
            'name' => 'Scarlett Johansson',
            'date_of_birth' => '1995/05/15',
            'image' => 'image.png'
        ]);

        DB::table('actors')->insert([
            'name' => 'Jennifer Lawrence',
            'date_of_birth' => '1995/05/15',
            'image' => 'image.png'
        ]);

        DB::table('actors')->insert([
            'name' => 'Scarlett',
            'date_of_birth' => '1995/05/15',
            'image' => 'image.png'
        ]);

        DB::table('actors')->insert([
            'name' => 'Angelina',
            'date_of_birth' => '1995/05/15',
            'image' => 'image.png'
        ]);

        DB::table('actors')->insert([
            'name' => 'Emily Blunt',
            'date_of_birth' => '1995/05/15',
            'image' => 'image.png'
        ]);

        DB::table('actors')->insert([
            'name' => 'Anne Hathaway',
            'date_of_birth' => '1995/05/15',
            'image' => 'image.png'
        ]);
    }
}
