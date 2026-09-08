<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function addToOrder(Request $request)
    {
        $order = Order::where('user_id', $request->user()->id)
                      ->where('status', 'pending')
                      ->first();

        if (!$order) {
            $order = Order::create([
                'user_id' => $request->user()->id,
                'total' => 0,
                'status' => 'pending',
            ]);
        }
            $product = Product::findOrFail($request->product_id);

            $price = $product->price;


                $orderItem = OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $price,
            ]);

        return response()->json([
            'success' => true,
            'order' => $order,
            'order_item' => $orderItem,
        ]);
    }
}
