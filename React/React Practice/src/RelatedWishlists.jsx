import React from 'react';

const WishlistItem = ({ title, description }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gray-200 h-24 rounded-md"></div>
            <div className="bg-gray-200 h-24 rounded-md"></div>
        </div>
        <button className="w-full bg-zinc-700 text-white py-2 rounded-md hover:bg-zinc-600 transition duration-300">
            View Wishlist
        </button>
    </div>
);

const RelatedWishlists = () => {
    const wishlists = [
        {
            title: "Summer Essentials",
            description: "A collection of must-have items for the summer season."
        },
        {
            title: "Cozy Home Essentials",
            description: "A collection of must-have items for a cozy home."
        }
    ];

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Related Wishlists</h2>
            {wishlists.map((wishlist, index) => (
                <WishlistItem key={index} {...wishlist} />
            ))}
        </div>
    );
};

export default RelatedWishlists;