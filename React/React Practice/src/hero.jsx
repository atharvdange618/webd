import React, { useState } from 'react'

function hero() {
    var [a, b] = useState(69);
    return (
        <div>
            <h2>Hero</h2>
            <h3>Counter value: {a}</h3>
            <button className='bg-green-700 px-2 rounded-md' onClick={() => b(a + 1)}>Click</button>
        </div>
    )
}

export default hero