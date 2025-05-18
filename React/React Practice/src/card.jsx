import React from 'react';

function Card() {
    return (
        <div className="max-w-xs bg-blue-300 shadow-lg rounded-lg overflow-hidden mx-auto">
            <div className='px-4 py-2'>
                <h1 className='text-gray-900 font-bold text-2xl'>
                    Card Label
                </h1>
                <p className='text-gray-700 text-sm mt-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='flex justify-end mt-4 px-4'>
                <a href='#' className="text-xl font-medium text-indigo-500">Learn more</a>
            </div>
        </div>
    );
}

export default Card;