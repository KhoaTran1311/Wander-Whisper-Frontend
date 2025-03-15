import React, { useEffect, useState } from 'react';

const Toast = ({ message, onClose, notify }) => {
    const [ progress, setProgress ] = useState(100);

    useEffect(() => {
        const duration = 2500;
        const intervalTime = 16;
        const steps = duration / intervalTime;
        const decrementPerStep = 100 / steps;

        let currentProgress = 0;

        const progressInterval = setInterval(() => {
            currentProgress += decrementPerStep;
            setProgress(Math.min(100, currentProgress));
        }, intervalTime);

        const timer = setTimeout(() => {
            clearInterval(progressInterval);
            setProgress(0);
            onClose()
        }, duration+100);
        
        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        }

    }, [notify, onClose]);

    return (
        <div
            className={`fixed h-11 bottom-14 left-1/2 transform -translate-x-1/2 overflow-hidden bg-emerald-500 border-2 border-emerald-700 text-white py-2 rounded-lg shadow-lg ${notify >= 0 ? 'opacity-100' : 'opacity-0'}`}
        >
            <p className='mx-4'>{message}</p>
            <div className='relative h-10 w-full mt-1 bg-emerald-700/0 rounded-none -top-9 z-50 overflow-hidden'>
                <div 
                    className='bg-emerald-700 h-full rounded-none opacity-20' 
                    style={{ width: `${progress}%`}}
                />
            </div>
        </div>
    );
};

export default Toast;
