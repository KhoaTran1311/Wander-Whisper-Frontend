import * as React from "react";

export const CloseIcon = () => (
    <svg
        className="w-7 h-7"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <g id="Menu / Close_SM">
            <path
                id="Vector"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m16 16-4-4m0 0L8 8m4 4 4-4m-4 4-4 4"
            />
        </g>
    </svg>
);

export const LeftArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 19l-7-7 7-7"/>
    </svg>
);

export const RightArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5l7 7-7 7"/>
    </svg>
);

export const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 19l-7-7 7-7"/>
    </svg>
);