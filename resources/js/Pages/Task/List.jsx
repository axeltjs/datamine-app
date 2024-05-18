import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

export default function List({ auth }) {
    const [edit, setEdit] = useState([]);
    const [listTask, setListTask] = useState([]);
    const [values, setValues] = useState('');
    const { post, processing } = useForm({});
    toastConfig({ theme: 'dark' });

    const addTask = (e) => {
        e.preventDefault();

        if (edit.id) {
            toast('Task has been edited!');

        } else {
            let saveTask = {
                task: values
            }

            fetch(route('task.create'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saveTask)
            });
            toast('Task has been added!');
        }
        cancelEdit();
        getData();
    };

    async function getData() {
        const request_event = await fetch(route('task.list'));
        const response_event = await request_event.json();

        response_event.status && setListTask([...response_event.result]);
    }

    let editTask = (itemTask) => {
        setValues(itemTask.task_name);
        setEdit(itemTask);
    }

    let deleteTask = (itemTask) => {
        fetch(route('task.delete', itemTask.id), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const filteredTask = listTask.filter(function (reference) {
            return reference.id !== itemTask.id;
        });

        setListTask(filteredTask);
        toast('Task has been deleted!');
    }

    let cancelEdit = () => {
        setEdit([]);
        setValues('');
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task List</h2>}
        >
            <Head title="Task List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Form */}
                        <form onSubmit={addTask} className="px-3 pt-6">
                            <div className="flex mb-4">
                                <input
                                    id="task"
                                    name="task"
                                    type="text"
                                    className="w-full px-4 py-2 mr-2 rounded-lg
                                    border-gray-300 focus:outline-none
                                    focus:border-blue-500"
                                    placeholder="Add new task"
                                    value={values}
                                    onChange={ function(event) {
                                        setValues(event.target.value);
                                    }}
                                    disabled={processing}
                                    required />
                                <button
                                    type='submit'
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-1 rounded">
                                    { edit.id ? 'Update' : 'Add' }
                                </button>
                                {
                                    edit.id &&
                                    <button
                                        type='button'
                                        onClick={ cancelEdit }
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                    >Cancel</button>
                                }
                            </div>
                        </form>

                        {/* Loop */}
                        <ul className="px-6 py-3">
                        {
                            listTask.length > 0 ?
                            listTask.map(function (item, index) {
                                return(
                                    <li key={index} className="border-b border-gray-200 flex items-center justify-between py-4">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="mr-2" />
                                            <span>{item.task_name}</span>
                                        </label>
                                        <div>
                                            <button
                                                className="text-blue-500 hover:text-blue-700 edit-btn bg-white rounded py-2 px-4"
                                                onClick={ editTask.bind(this, item) }
                                            >Edit</button>
                                            <button
                                                className="text-red-500 hover:text-red-700 mr-2 delete-btn bg-white rounded py-2 px-4"
                                                onClick={ deleteTask.bind(this, item) }
                                            >Delete</button>
                                        </div>
                                    </li>
                                );
                            })
                        :
                            <li className="border-b border-gray-200 flex items-center justify-between py-4">
                                <i>No Task Available.</i>
                            </li>
                        }
                        </ul>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
