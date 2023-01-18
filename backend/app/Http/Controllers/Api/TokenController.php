<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class TokenController extends Controller
{
    public function refresh(Request $request)
    {
        $refresh_token = $request->cookie('refresh_token');

        if (!$refresh_token) {
            return response()->json(['message' => 'Unauthenticated', 'status' => 401], 401);
        }

        $token = PersonalAccessToken::findToken($refresh_token);
        if (!$token) {
            return response()->json(['message' => 'Unauthenticated', 'status' => 401], 401);
        }

        if ($token->expires_at >= Carbon::now() && in_array('refresh_token', $token->abilities)) {
            $user = $token->tokenable;
            $access_token = $user->createToken('access_token', 'access', ['access_token'])->plainTextToken;

            return response()->json(['message' => 'Token refreshed successfully', 'access_token' => $access_token, 'status' => 200], 200);
        } else {
            return response()->json(['message' => 'Invalid token', 'status' => 401], 401);
        }
    }
}
