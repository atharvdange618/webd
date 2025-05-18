import React, { useState, useEffect } from 'react'

const Hooks = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => setUsers(users))
    }, []);

    return (
        <div>
            {
                users.map((ele) => {
                    return (
                        <ul key={ele.id}>
                            <li >{ele.id}) {ele.name}</li>
                            <li>-->{ele.email}</li>
                        </ul>
                    )
                })
            }
        </div>
    )
}

export default Hooks