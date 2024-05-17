import { forwardRef, useEffect, useRef } from 'react';
export default forwardRef(function TextInput({ isFocused = false, disabled, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex mb-4">
            <input
                {...props}
                type="text"
                className="w-full px-4 py-2 mr-2 rounded-lg
                border-gray-300 focus:outline-none
                focus:border-blue-500"
                placeholder="Add new task"
                ref={input}
                required />
            <button type='submit' disabled={disabled} className="bg-blue-500 hover:bg-blue-700
                text-white font-bold py-2 px-4 rounded">
                Add
            </button>
        </div>
    );
});
