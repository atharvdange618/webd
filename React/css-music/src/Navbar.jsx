import React from 'react'
import style from './style.module.css'

const Navbar = ({ data }) => {
    return (
        <div className=' w-full px-20 py-3 flex items-center justify-between'>
            <h3 className={`${style.a} font-bold`}>Orange</h3>
            <div className='flex bg-orange-500 p-2 px-4 text-white rounded-md text-sm gap-3'>
                <h3>Favorites </h3>
                <h4 className='bg-orange-600 rounded-md px-2 py-.5'>{data.filter((item) => item.added).length}</h4>
            </div>
        </div >
    )
}

export default Navbar