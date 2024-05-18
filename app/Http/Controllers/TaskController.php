<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $list = Task::orderBy('id', 'desc')->get();

        return response()->json([
            'status' => true,
            'result' => $list
        ]);
    }
    public function create(Request $request)
    {
        $request->validate([
            'task' => 'required|string|max:180|min:1',
        ]);

        Task::create([
            'task_name' => $request->task,
            'is_complete' => 0,
        ]);
    }

    public function destroy($id)
    {
        return Task::find($id)->delete();
    }

}
