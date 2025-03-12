import React, { useEffect, useState } from 'react';

const Toast = ({ message, onClose, notify }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const duration = 2000;
        const intervalTime = 16;
        const steps = duration / intervalTime;
        const decrementPerStep = 100 / steps;

        let currentProgress = 100;

        const progressInterval = setInterval(() => {
            currentProgress -= decrementPerStep;
            setProgress(Math.max(0, currentProgress));
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
            className={`fixed bottom-14 left-1/2 transform -translate-x-1/2 bg-emerald-500 border-2 border-b-0 border-emerald-700 text-white p-0 pt-2 rounded-lg rounded-b-none shadow-lg ${notify >= 0 ? 'opacity-100' : 'opacity-0'}`}
        >
            <p className='mx-4'>{message}</p>
            <div className='w-full mt-1 bg-emerald-700 rounded-none h-[2px] overflow-hidden'>
                <div 
                    className='bg-white h-full rounded-none' 
                    style={{ width: `${progress}%`}}
                />
            </div>
        </div>
    );
};

export default Toast;
