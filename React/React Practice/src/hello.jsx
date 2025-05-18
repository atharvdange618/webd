import React from 'react'

function hello({ data }) {
    return (
        <>
            <div>
                <h2 className=' bg-red text-white'>Hello {data.name} and your age is {data.age} !</h2>
            </div>
        </>
    )
}

export default hello