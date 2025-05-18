import React, { useState } from 'react';

const BgChanger = () => {
    const [bgColor, setbgColor] = useState("black");

    const changeColor = (color) => {
        setbgColor(color);
    };

    return (
        <div className='w-full h-screen flex-wrap flex items-center justify-center' style={{ backgroundColor: bgColor }}>
            <div className='w-[800px] shadow-lg bg-white h-12 rounded-md px-2 pt-2'>
                <button className='bg-red-500 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('red')}>Red</button>
                <button className='bg-blue-500 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('blue')}>Blue</button>
                <button className='bg-pink-500 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('pink')}>Pink</button>
                <button className='bg-violet-500 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('violet')}>Violet</button>
                <button className='bg-purple-400 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('purple')}>Purple</button>
                <button className='bg-zinc-900 text-white px-4 py-1 rounded-md ml-2' onClick={() => changeColor('black')}>Black</button>
                <button className='bg-yellow-500 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('yellow')}>Yellow</button>
                <button className='bg-green-800 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('olive')}>Olive</button>
                <button className='bg-zinc-400 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('gray')}>Gray</button>
                <button className='bg-white-500 px-4 py-1 rounded-md ml-2' onClick={() => changeColor('white')}>White</button>
            </div>
        </div>
    );
}

export default BgChanger