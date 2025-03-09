import { useEffect } from "react";

const Toast = ({ message, onClose, notify }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-14 left-1/2 transform -translate-x-1/2 bg-emerald-500 border-2 border-emerald-700 text-white p-2 px-4 rounded-lg  shadow-lg ${notify>=0 ? 'opacity-100' : 'opacity-0'}`}>
            <p>{message}</p>
        </div>
    );
};

export default Toast;
