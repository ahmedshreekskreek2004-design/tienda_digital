<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;


class ProductSeeder extends Seeder
{

    public function run(): void
    {
            Product::truncate();

        Product::create([
            'category' => 'robas',
            'title' => 'camiseta de ESP',
            'price' => 50,
            'image' => 'product/fotos/robas/esp.avif',
        ]);

        Product::create([
            'category' => 'robas',
            'title' => 'camisteta de FCB',
            'price' => 50,
            'image' => 'product/fotos/robas/fcb.webp',
        ]);

        Product::create([
            'category' => 'robas',
            'title' => 'camiseta de RMA',
            'price' => 50,
            'image' => 'product/fotos/robas/rma.webp',
        ]);
        Product::create([
            'category' => 'perfuma',
            'title' => 'prefuma de YOU',
            'price' => 50,
            'image' => 'product/fotos/perfuma/perfuma1.webp',
        ]);
        Product::create([
            'category' => 'perfuma',
            'title' => 'prefuma de BLACK OPIUM',
            'price' => 50,
            'image' => 'product/fotos/perfuma/perfuma2.jpg',
        ]);
        Product::create([
            'category' => 'perfuma',
            'title' => 'prefuma de SAUVAGE',
            'price' => 50,
            'image' => 'product/fotos/perfuma/perfuma3.avif',
        ]);
        Product::create([
            'category' => 'reloj',
            'title' => 'reloj de roluex',
            'price' => 50,
            'image' => 'product/fotos/reloj/foto1.webp',
        ]);
        Product::create([
            'category' => 'reloj',
            'title' => 'reloj de casio',
            'price' => 50,
            'image' => 'product/fotos/reloj/foto2.png',
        ]);
        Product::create([
            'category' => 'reloj',
            'title' => 'reloj de roluex',
            'price' => 50,
            'image' => 'product/fotos/reloj/foto3.webp',
        ]);
    }

    }

