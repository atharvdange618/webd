import React, { useState, useEffect } from 'react'

const UseEffectPrac = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("Count is changed")
    }, [count])


    return (
        <div className=' p-4'>
            <h3 className=' font-semibold text-lg'>Count is: {count}</h3>
            <button className='bg-green-700 p-1 rounded-md' onClick={() => setCount(count + 1)}>Increment</button>
            <button className='bg-red-700 p-1 ml-1 rounded-md' onClick={() => setCount(count - 1)}>Decrement</button>
            <button className='bg-blue-700 p-1 ml-1 rounded-md' onClick={() => setCount(0)}>Reset</button>
        </div>
    )
}

export default UseEffectPrac