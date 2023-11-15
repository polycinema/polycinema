<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('movies')->insert([
            'name' => 'Infinity War',
            'title' => 'Phim hay lắm',
            'image' => 'movies/image_movie.png',
            'trailer' => 'https://www.youtube.com/watch?v=BWJJwk2j-7A',
            'description' => 'Phim của marvel',
            'release_date' => '2023-11-02 18:30:00',
            'duration' => 93,
            'director_id' => 1,
        ]);

        DB::table('movies')->insert([
            'name' => 'End Game',
            'title' => 'Phim hay lắm luôn ý',
            'image' => 'movies/image_movie.png',
            'trailer' => 'https://www.youtube.com/watch?v=BWJJwk2j-7A',
            'description' => 'Phim của marvel studio',
            'release_date' => '2023-11-06 18:30:00',
            'duration' => 93,
            'director_id' => 1,
        ]);


    }
}
