<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('users/index', [
            'users' => $users
        ]);
    }

    public function view($id)
    {
        $user = User::find($id);
        return Inertia::render('users/view', [
            'user' => $user
        ]);
    }
}
