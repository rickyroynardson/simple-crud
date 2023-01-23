<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // register new user
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        try {
            $payload = [
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password'])
            ];

            User::create($payload);

            return response()->json(['message' => 'User registered successfully', 'status' => 201], 201);
        } catch (QueryException $error) {
            return response()->json(['message' => 'Error occured while processing the request', 'error' => $error, 'status' => 500], 500);
        }
    }

    // login user
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        try {
            $credentials = [
                'email' => $validated['email'],
                'password' => $validated['password']
            ];

            if (Auth::attempt($credentials)) {
                $user = User::where('email', $validated['email'])->first();
                $access_token = $user->createToken('access_token', 'access', ['access_token'])->plainTextToken;
                $refresh_token = $user->createToken('refresh_token', 'refresh', ['refresh_token'])->plainTextToken;

                return response()->json(['message' => 'User logged in successfully', 'user' => $user, 'access_token' => $access_token, 'status' => 200], 200)->withCookie(cookie('refresh_token', $refresh_token, env('REFRESH_TOKEN_EXPIRES_IN', 60 * 24 * 30)));
            } else {
                return response()->json(['message' => 'Invalid credentials', 'errors' => [], 'status' => 401], 401);
            }
        } catch (QueryException $error) {
            return response()->json(['message' => 'Error occured while processing the request', 'error' => $error, 'status' => 500], 500);
        }
    }
}
