<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Clients;
use App\Models\User;
use App\Models\State;
use App\Models\Schedule;
use Carbon\Carbon;


class DashBoardController extends Controller
{
    public function index()
    {

        $cont_clients = Clients::count();
        $cont_users = User::count();
        $cont_states = State::count();
        $startDate = Carbon::now()->format('Y-m-d');
        $endDate = Carbon::now()->addDays(30)->format('Y-m-d');

        $appointments = Schedule::whereBetween('selected_date', [$startDate, $endDate])
        ->get();

        foreach($appointments as $appointment){
            $convertedDate = Carbon::createFromFormat('Y-m-d', $appointment->selected_date)->format('d-m-Y');
            $appointment->selected_date = $convertedDate;
        }

        return response(
            [
                "clients"=>$cont_clients, 
                "users"=>$cont_users, 
                "states"=>$cont_states, 
                "appointments"=>$appointments, 
                204
            ]);
    }
}
