<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AdminCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if a user with the "super-admin" role exists
        $superAdminExists = User::whereHas('roles', function ($query) {
            $query->where('name', 'super-admin');
        })->exists();
        if ($superAdminExists) {
            return redirect('/login'); // Redirect to home or any other page
        }
        return $next($request);
    }
}
