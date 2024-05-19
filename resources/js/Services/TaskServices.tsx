export interface Todo {
    id: number;
    saveTask: string;
    completed: boolean;
    auth: string;
  }

  export const fetchTodos = async (auth: string): Promise<Todo[]> => {
    const request_event = await fetch(route('task.list'), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        }
    });
    const response_event = await request_event.json();

    return response_event;
  };

  export const addTodo = async (auth: string, saveTask: string): Promise<Todo> => {
    const response = await fetch(route('task.create'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(saveTask)
    });
    const newTodo: Todo = await response.json();
    return newTodo;
  };

  export const editTodo = async (auth: string, saveTask: string, id: number): Promise<Todo> => {
    const response = await fetch(route('task.update', id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(saveTask)
    });
    const newTodo: Todo = await response.json();

    return newTodo;
  };

  export const deleteTodo = async (auth: string, id: number): Promise<void> => {
    await fetch(route('task.delete', id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        }
    });
  }

export const updateCheckTodo = async (auth: string, id: number): Promise<void> => {
    await fetch(route('task.checklist', id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        }
    });
}
