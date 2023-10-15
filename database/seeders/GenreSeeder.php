<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('genres')->insert([
            'name' => 'Hành Động'
        ]);

        DB::table('genres')->insert([
            'name' => 'Tình Cảm'
        ]);

        DB::table('genres')->insert([
            'name' => 'Hài Hước'
        ]);

        DB::table('genres')->insert([
            'name' => 'Cổ Trang'
        ]);

        DB::table('genres')->insert([
            'name' => 'Tâm Lý'
        ]);

        DB::table('genres')->insert([
            'name' => 'Hình Sự'
        ]);

        DB::table('genres')->insert([
            'name' => 'Chiến Tranh'
        ]);

        DB::table('genres')->insert([
            'name' => 'Thể Thao'
        ]);

        DB::table('genres')->insert([
            'name' => 'Võ Thuật'
        ]);

        DB::table('genres')->insert([
            'name' => 'Hoạt Hình'
        ]);

        DB::table('genres')->insert([
            'name' => 'Viễn Tưởng'
        ]);

        DB::table('genres')->insert([
            'name' => 'Phiêu Lưu'
        ]);

        DB::table('genres')->insert([
            'name' => 'Kinh Dị'
        ]);

        DB::table('genres')->insert([
            'name' => 'Anime'
        ]);

    }
}
