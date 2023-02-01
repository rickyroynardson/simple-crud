<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNoteRequest;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $notes = $request->user()->notes()->get();
        return response()->json(['message' => 'Success fetch all user notes data', 'data' => $notes, 'status' => 200], 200);
    }

    public function show(Request $request, $id)
    {
        $note = $request->user()->notes()->find($id);
        return response()->json(['message' => 'Success fetch user note data by id:' . $id, 'data' => $note, 'status' => 200], 200);
    }

    public function store(StoreNoteRequest $request)
    {
        $validated = $request->validated();

        try {
            $payload = [
                'title' => $validated['title'],
                'body' => $validated['body']
            ];

            User::find($validated['user_id'])->notes()->create($payload);

            return response()->json(['message' => 'Note created successfully', 'status' => 201], 201);
        } catch (QueryException $error) {
            return response()->json(['message' => 'Error occured while processing the request', 'error' => $error, 'status' => 500], 500);
        }
    }
}
