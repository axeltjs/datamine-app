<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $list = Task::orderBy('is_complete', 'asc')->orderBy('id', 'desc')->get();

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

        return Task::create([
            'task_name' => $request->task,
            'is_complete' => 0,
        ]);
    }

    public function update($id, Request $request)
    {
        $request->validate([
            'task' => 'required|string|max:180|min:1',
        ]);

        $task = Task::find($id);
        $task->update([
            'task_name' => $request->task,
        ]);

        return response()->json($task);
    }

    public function checklist($id)
    {
        $check = Task::find($id);
        $update_checklist['is_complete'] = 1;

        if ($check->is_complete) {
            $update_checklist['is_complete'] = 0;
        }

        return $check->update($update_checklist);
    }

    public function destroy($id)
    {
        return Task::find($id)->delete();
    }

}
