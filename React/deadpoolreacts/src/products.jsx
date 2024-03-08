import React from 'react'

function products({data, age}) {
    return (
        <div>
            <h1>hello {data.name} {data.surname}. Your age is: {age}</h1>
        </div>
    )
}

export default products