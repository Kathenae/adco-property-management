<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthenticatedTokenController extends Controller
{
    public function store(LoginRequest $request) {
        $request->authenticate();
        $user = User::query()->where('email', $request->email)->first();
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth-token')->plainTextToken,
        ]);
    }
}