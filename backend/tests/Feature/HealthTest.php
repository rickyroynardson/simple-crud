<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_api_health()
    {
        $response = $this->get('/api/v1/health');

        $response->assertStatus(200)->assertJsonStructure(['message', 'status']);
    }
}
