<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('movie_genres')->insert([
            'movie_id' => 1,
            'genre_id' => 1,
        ]);

        DB::table('movie_genres')->insert([
            'movie_id' => 1,
            'genre_id' => 6,
        ]);

        DB::table('movie_genres')->insert([
            'movie_id' => 1,
            'genre_id' => 7,
        ]);

        DB::table('movie_genres')->insert([
            'movie_id' => 3,
            'genre_id' => 10,
        ]);

        DB::table('movie_genres')->insert([
            'movie_id' => 2,
            'genre_id' => 12,
        ]);

        DB::table('movie_genres')->insert([
            'movie_id' => 3,
            'genre_id' => 12,
        ]);

        DB::table('movie_genres')->insert([
            'movie_id' => 2,
            'genre_id' => 13,
        ]);
        
    }
}
