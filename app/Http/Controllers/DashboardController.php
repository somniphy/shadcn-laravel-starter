<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

use App\Models\User;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $monthlyUsers = User::select(DB::raw("strftime('%m', created_at) as month"), DB::raw('count(*) as count'))
            ->where('created_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                // Convert month number to short month name
                $monthName = Carbon::createFromFormat('m', $item->month)->format('M');
                return [
                    'month' => $monthName,
                    'count' => $item->count
                ];
            });

        return Inertia::render('dashboard', [
            'users' => [
                'total' => User::count(),
                'list' => User::latest()->take(5)->get(),
                'growth' => User::where('created_at', '>=', Carbon::now()->subMonth())->count(),
                'monthly' => $monthlyUsers
            ]
        ]);
    }
}



