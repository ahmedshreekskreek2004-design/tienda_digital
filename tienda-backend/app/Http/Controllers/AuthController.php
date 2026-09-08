<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;

class AuthController extends Controller
{
 public function register(Request $request)
{
    $nuevoUser = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    if ($nuevoUser) {
        return response()->json(true);
    }

    return response()->json(false);
}


public function login(Request $request)
{
    $user = User::where('email', $request->email)->first();

    if ($user && Hash::check($request->password, $user->password)) {

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'user' => $user,
            'token' => $token,
        ]);
    }

    return response()->json([
        'success' => false,
        'message' => 'Email or password is incorrect',
    ], 401);
}
}




