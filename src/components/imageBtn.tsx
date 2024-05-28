'use client'

import React from "react";

type ImageBtnProps = {
    url: string | null;

};

const ImageBtn: React.FC<ImageBtnProps> = ({ url}) => {
    const openImage = () => {
        const popupWindow = window.open('', 'Image Preview', 'width=600,height=400,scrollbars=yes,resizable=yes');
        if (popupWindow) {
            popupWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Image Preview</title>
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            background-color: #000;
                        }
                        img {
                            max-width: 100%;
                            max-height: 100%;
                            object-fit: contain;
                        }
                    </style>
                </head>
                <body>
                    <img src="${url}" alt="Image Preview">
                </body>
                </html>
            `);
            popupWindow.document.close();
        }
    };



    return  (
        <div className="mt-10 relative max-w-[250px]">
            <button
                className="absolute top-[10px] right-[-10px] rounded text-white p-1 z-10 h-4"
                onClick={() => window.location.reload()}
            >
                X
            </button>
            <button
                className="mt-2 bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block w-100 left-4"
                onClick={openImage}
            >
                <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                </span>
                <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
                    <span>{`Image`}</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M10.75 8.75L14.25 12L10.75 15.25"
                        ></path>
                    </svg>
                </div>
                <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
        </div>
    );
};

export default ImageBtn;