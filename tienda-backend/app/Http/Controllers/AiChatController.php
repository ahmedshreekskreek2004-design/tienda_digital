<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use OpenAI\Laravel\Facades\OpenAI;

class AiChatController extends Controller
{
    public function chat(Request $request)
    {
        $question = $request->question;
        $products = Product::all();

        $response = OpenAI::responses()->create([
            'model' => 'gpt-5',
            'input' => [
                [
                    'role' => 'system',
                    'content' => 'You are an assistant for an online store. Answer the user using the products provided.',
                ],
                [
                    'role' => 'user',
                    'content' => json_encode([
                        'question' => $question,
                        'products' => $products,
                    ]),
                ],
            ],
        ]);

        return response()->json([
            'success' => true,
            'question' => $question,
            'answer' => $response->outputText,
        ]);
    }
}

