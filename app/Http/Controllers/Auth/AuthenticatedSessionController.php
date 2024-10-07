<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Route;

class AuthenticatedSessionController extends Controller
{   

    /**
     * Display the login view.
     */
    public function create()
    {
        return Inertia::render('Login', [
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        if (request()->wantsJson()) {
            return response()->json();
        } else {
            return redirect(route('home', absolute: false));
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        if (request()->wantsJson()) {
            return response()->json();
        } else {
            return redirect(route('home', absolute: false));
        }
    }
}
