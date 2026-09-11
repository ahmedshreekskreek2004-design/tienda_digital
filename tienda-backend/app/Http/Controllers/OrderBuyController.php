<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderBuyController extends Controller
{
    public function buy(Request $request)
    {
    $user = $request->user();

    $order = Order::where('user_id', $user->id)
                  ->where('status', 'pending')
                  ->first();

    if (!$order) {
        return response()->json([
            'success' => false,
            'message' => 'No pending order found',
        ], 404);
    }

    $orderItems = OrderItem::where('order_id', $order->id)->get();

    $total = 0;

    foreach ($orderItems as $item) {
        $totalItem = $item->price * $item->quantity;
        $total += $totalItem;
    }

    // نحفظ الـTotal
    $order->update([
        'total' => $total,
    ]);

    return response()->json([
        'success' => true,
        'total' => $total,
        'order' => $order,
    ]);
}
  public function confirm(Request $request)
{
    $user = $request->user();

    $order = Order::where('user_id', $user->id)
                  ->where('status', 'pending')
                  ->first();

    if (!$order) {
        return response()->json([
            'success' => false,
            'message' => 'No pending order found',
        ], 404);
    }

    $order->update([
        'status' => 'completed',
    ]);

    $token_telegram = env('TELEGRAM_BOT_TOKEN');
    $chatId = env('TELEGRAM_CHAT_ID');

        $message = "✅ Order Completed\n\n"
                . "Order ID: #" . $order->id . "\n"
                . "User ID: " . $user->id . "\n"
                . "Status: " . $order->status;

    file_get_contents(
        "https://api.telegram.org/bot{$token_telegram}/sendMessage?" . http_build_query([
            'chat_id' => $chatId,
            'text' => $message,
        ])
    );

    return response()->json([
        'success' => true,
        'order' => $order,
    ]);
}
}
