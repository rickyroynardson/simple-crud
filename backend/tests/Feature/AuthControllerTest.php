<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    public function test_register_with_empty_data()
    {
        $response = $this->post('/api/v1/register', [], ['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonStructure(['message', 'errors' => ['name', 'email', 'password']]);
    }

    public function test_register_success()
    {
        $response = $this->post('/api/v1/register', [
            'name' => 'John Doe',
            'email' => 'johndoe@mail.com',
            'password' => 'johndoe',
            'password_confirmation' => 'johndoe'
        ], ['Accept' => 'application/json']);

        $response->assertStatus(201)->assertJsonStructure(['message', 'status']);
    }

    public function test_register_with_registered_user_data()
    {
        $response = $this->post('/api/v1/register', [
            'name' => 'John Doe',
            'email' => 'johndoe@mail.com',
            'password' => 'johndoe',
            'password_confirmation' => 'johndoe'
        ], ['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonStructure(['message', 'errors' => ['email']]);
    }
}
