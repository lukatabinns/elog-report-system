<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Property;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       // $faker = Property::factory(100)->create();

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            DB::table('properties')->insert([
                'name' => $faker->unique()->domainWord(),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime
            ]);
        }

        for ($i = 0; $i < 10; $i++) {
            DB::table('users')->insert([
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'id_number' => $faker->unique()->randomDigit(),
                'created_at' => $faker->dateTime,
                'updated_at' => $faker->dateTime
            ]);
        }
    }
}
