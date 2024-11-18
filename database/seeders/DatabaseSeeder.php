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
        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@user.com',
            'password' => 'password',
            'email_verified_at' => now(),
            'updated_at' => now(),
            'created_at' => now(),
    ]);

        $userGroups = [
            ['count' => 10, 'from' => '-3 months', 'to' => 'now'],
            ['count' => 4,  'from' => '-2 months', 'to' => 'now'],
            ['count' => 6, 'from' => '-6 months', 'to' => 'now'],
            ['count' => 2, 'from' => '-4 months', 'to' => 'now'],
        ];

        // create users for each group
        foreach ($userGroups as $group) {
            User::factory($group['count'])->create([
                'created_at' => fake()->dateTimeBetween($group['from'], $group['to']),
            ]);
        }
    }
}
