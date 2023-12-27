<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieActorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('movie_actors')->insert([
            'movie_id' => 1,
            'actor_id' => 5,
        ]);

        DB::table('movie_actors')->insert([
            'movie_id' => 3,
            'actor_id' => 2,
        ]);

        DB::table('movie_actors')->insert([
            'movie_id' => 3,
            'actor_id' => 3,
        ]);

        DB::table('movie_actors')->insert([
            'movie_id' => 1,
            'actor_id' => 4,
        ]);

        DB::table('movie_actors')->insert([
            'movie_id' => 1,
            'actor_id' => 5,
        ]);

        DB::table('movie_actors')->insert([
            'movie_id' => 2,
            'actor_id' => 5,
        ]);
    }
}
