import React from 'react';

const Card = () => {

    const data = [
        {
            image: "https://images.unsplash.com/photo-1633174524827-db00a6b7bc74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1hem9ufGVufDB8fDB8fHww", name: "Amazon Basics", description: "Cillum cillum ipsum cillum ea in incididunt.", inStock: true
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1683134575803-444b187f9b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGJlYXV0aWZ1bCUyMGdpcmx8ZW58MHx8MHx8fDA%3D", name: "Beautiful Girl", description: "Cillum cillum ipsum cillum ea in incididunt.", inStock: false
        },
        {
            image: "https://images.unsplash.com/photo-1636581881418-2c45c2b9af4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGxhc2VyJTIwZ3VufGVufDB8fDB8fHww", name: "Sci-Fi Gun", description: "Cillum cillum ipsum cillum ea in incididunt.", inStock: true
        },
    ]
    return (
        <div className='w-full h-screen bg-zinc-200 flex items-center justify-center gap-10'>
            {
                data.map((elem, index) => (
                    <div key={index} className='w-52 bg-zinc-100 rounded-md overflow-hidden'>
                        <div className=' w-full h-32 bg-zinc-300'>
                            <img className='w-full h-full object-cover' src={elem.image} />
                        </div>
                        <div className=' w-full px-3 py-4 '>
                            <h2 className=' font-semibold'>{elem.name}</h2>
                            <p className=' text-xs mt-3'>
                                {elem.description}
                            </p>
                            <button className={`px-4 py-1 ${elem.inStock ? 'bg-blue-600' : "bg-red-600"} text-sm text-zinc-300 rounded mt-3`}>
                                {elem.inStock ? "In Stock" : "Out Of Stock"}
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Card;
