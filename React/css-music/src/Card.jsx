import React from 'react';

const Card = ({ data, id, handleClick }) => {

    const { image, name, artist, added } = data
    return (
        <div className='bg-zinc-100 w-60 p-4 rounded-md flex gap-2 pb-8 relative mt-5'>
            <div className='w-20 h-20 rounded-md bg-orange-600'>
                <img className='w-full h-full object-cover overflow-hidden' src={image} alt='Card Image' />
            </div>
            <div>
                <h3 className='text-xl font-semibold'>{name}</h3>
                <h6 className='text-sm'>{artist}</h6>
            </div>
            <button onClick={() => handleClick(id)} className={`${added === false ? "bg-orange-600" : "bg-blue-400"} whitespace-nowrap px-4 py-2 rounded-full text-white absolute left-1/2 bottom-0 -translate-x-[50%] translate-y-[50%] text-sm`}>{added === false ? "Add To Favourites" : "Added"}</button>
        </div>
    );
}

export default Card;
