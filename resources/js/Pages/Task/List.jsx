
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TaskInput from '@/Components/TaskInput';

export default function List({ auth }) {
    const { post, processing } = useForm({});

    const addTask = (e) => {
        e.preventDefault();
        post(route('task.create'));
    };

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
                            <TaskInput
                                id="task"
                                name="task"
                                isFocused={true}
                                disabled={processing}
                            />
                        </form>

                        {/* Loop */}
                        <ul className="px-6 py-3">
                            <li className="border-b border-gray-200 flex items-center justify-between py-4">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span>Lorem Ipsum</span>
                                </label>
                                <div>
                                    <button className="text-red-500 hover:text-red-700
                                    mr-2 delete-btn">Delete</button>
                                    <button className="text-blue-500
                                    hover:text-blue-700 edit-btn">Edit</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
