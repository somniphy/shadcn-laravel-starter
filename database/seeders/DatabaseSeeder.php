<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin/test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'email_verified_at' => now(),
            'updated_at' => now(),
            'created_at' => now(),
        ]);

        User::factory(10)->create([
            'created_at' => fake()->dateTimeBetween('-3 months', 'now'),
            'updated_at' => fake()->dateTimeBetween('-2 months', 'now'),
        ]);

        User::factory(10)->create([
            'created_at' => fake()->dateTimeBetween('-6 months', '-4 months'),
            'updated_at' => fake()->dateTimeBetween('-4 months', '-2 months'),
        ]);
    }
}
