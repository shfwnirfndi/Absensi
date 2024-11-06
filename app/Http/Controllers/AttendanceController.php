<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
    //Component Submitted
    static function isTodayAttendanceSubmitted(): bool //apakah hari ini absensinya sudah di submit
    {
        return Attendance::where('user_id', auth()->id())
                            ->whereDate('created_at', now()->toDateString())
                            ->exists();
    }

    //List Attendance
    public function index(): Response
    {
        //query all attendances and paginate it
        $attendances = Attendance::with('user')->paginate(10);

        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances
        ]);
    }

    public function submit(Request $request) {
        $request->validate([
            'status' => 'required',
            'description' => 'required_if:status,sick,leave,permit,business_trip,remote|max:500',
            'latitude' => 'required',
            'longitude' => 'required',
            'address' => 'required'
        ]);

        Attendance::create([
            'user_id' => auth()->id(),
            'status' => $request->status,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'address' => $request->address
        ]);

        return redirect::route('users');
    }
}
