<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['name' => 'Admin', 'email' => 'admin@gmail.com', 'password' => Hash::make(123123), 'role' => 'admin'],
            ['name' => 'user1', 'email' => 'user1@gmail.com', 'password' => Hash::make(123123), 'role' => 'user']
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                [
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => $user['password']
                ],
                [
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => $user['password']
                ]
            );
        }
    }
}
