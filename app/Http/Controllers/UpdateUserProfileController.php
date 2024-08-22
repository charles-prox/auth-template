<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(User $user, array $input): void
    {
        dd($input['photo']);
        // 
    }
}
