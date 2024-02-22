<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Schedule::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $current_schedule = new Schedule;
        $date = Carbon::parse($request->selected_date);

        $current_schedule->selected_date = $request->selected_date; 
        $current_schedule->selected_time = $request->selected_time; 
        $current_schedule->day =  $date->day; 
        $current_schedule->title = $request->title; 
        $current_schedule->description = $request->description; 
        $current_schedule->save();

        return response("Atualizado com sucesso!", 204);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $current_schedule = Schedule::find($id);
        $date = Carbon::parse($request->selected_date);

        $current_schedule->selected_date = $request->selected_date; 
        $current_schedule->day =  $date->day; 
        $current_schedule->selected_time = $request->selected_time; 
        $current_schedule->title = $request->title; 
        $current_schedule->description = $request->description; 
        $current_schedule->save();

        return response("Atualizado com sucesso!", 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Schedule::destroy($id);

        return response("", 204);
    }
    public function appointment(Request $request){

        $appointments = [];
        switch($request['target']){
            case('month'):
                $appointments = DB::table('schedule')
                    ->whereMonth('selected_date', $request['month'])
                    ->whereYear('selected_date', $request['year'])
                    ->get();
            break;
            case('day'):
                $appointments = DB::table('schedule')
                    ->where('selected_date', $request['data'])
                    ->get();
            break;
        }
        return $appointments;
    }
}
