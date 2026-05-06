<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name_en' => 'E-commerce',
                'name_ar' => 'تجارة إلكترونية',
                'slug' => 'ecommerce',
                'icon' => 'shopping-bag',
            ],
            [
                'name_en' => 'Digital Services',
                'name_ar' => 'خدمات رقمية',
                'slug' => 'digital-services',
                'icon' => 'cpu',
            ],
            [
                'name_en' => 'Home Services',
                'name_ar' => 'خدمات منزلية',
                'slug' => 'home-services',
                'icon' => 'home',
            ],
            [
                'name_en' => 'Handicrafts',
                'name_ar' => 'صناعة يدوية',
                'slug' => 'handicrafts',
                'icon' => 'palette',
            ],
            [
                'name_en' => 'Tech & Software',
                'name_ar' => 'تقنية وبرمجيات',
                'slug' => 'tech',
                'icon' => 'cpu',
            ],
            [
                'name_en' => 'Environment',
                'name_ar' => 'بيئة',
                'slug' => 'environment',
                'icon' => 'leaf',
            ],
            [
                'name_en' => 'Education',
                'name_ar' => 'تعليم',
                'slug' => 'education',
                'icon' => 'graduation-cap',
            ],
            [
                'name_en' => 'Health',
                'name_ar' => 'صحة',
                'slug' => 'health',
                'icon' => 'heart',
            ],
            [
                'name_en' => 'Other',
                'name_ar' => 'أخرى',
                'slug' => 'other',
                'icon' => 'more-horizontal',
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}
