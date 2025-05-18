import React from 'react';

const ProfileHeader = ({ name, title, joinDate }) => (
    <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
        <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-600">{title}</p>
            <p className="text-sm text-gray-500">Joined {joinDate}</p>
        </div>
    </div>
);

const About = ({ description }) => (
    <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">About</h2>
        <p className="text-gray-700">{description}</p>
    </div>
);

const WishlistItem = ({ title, description }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-200 h-20 rounded-md"></div>
            <div className="bg-gray-200 h-20 rounded-md"></div>
            <div className="bg-gray-200 h-20 rounded-md"></div>
        </div>
        <button className="text-blue-600 text-sm font-semibold">View Wishlist</button>
    </div>
);
const LikedComment = ({ author, time, content, likes }) => (
    <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
        <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <div>
                <h4 className="font-semibold text-sm">{author}</h4>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
        <p className="text-sm text-gray-700 mb-2">{content}</p>
        <div className="flex items-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">{likes}</span>
        </div>
    </div>
);

const UserProfile = () => {
    const user = {
        name: "John Doe",
        title: "Software Engineer",
        joinDate: "June 2023",
        about: "I'm a software engineer with a passion for building innovative products. In my free time, I enjoy exploring new technologies and contributing to open-source projects.",
        wishlists: [
            {
                title: "Summer Essentials",
                description: "A collection of must-have items for the summer season."
            },
            {
                title: "Cozy Home Essentials",
                description: "A collection of must-have items for a cozy home."
            }
        ],
        likedComments: [
            {
                author: "Sarah Johnson",
                time: "2 days ago",
                content: "I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some healthier options.",
                likes: 25
            },
            {
                author: "Alex Smith",
                time: "3 weeks ago",
                content: "I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my life. I used to spend hours every weekend cleaning my house, but now I can simply turn on this little robot and let it do the work. It's incredibly efficient, navigating around obstacles with ease. The only reason I didn't give it a perfect 5-star rating is that it occasionally gets stuck under low furniture. Overall, it's been a great addition to my home, saving me time and effort.",
                likes: 18
            },
            {
                author: "Emily Parker",
                time: "2 days ago",
                content: "The battery life is impressive, lasting me for long-haul flights without any issues. They are comfortable to wear for extended periods, and I appreciate the sleek design. Worth every penny, and I'd recommend these headphones to anyone who values high-quality audio and peace and quiet.",
                likes: 15
            }
        ]
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <ProfileHeader name={user.name} title={user.title} joinDate={user.joinDate} />
            <About description={user.about} />
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Wishlists</h2>
                {user.wishlists.map((wishlist, index) => (
                    <WishlistItem key={index} {...wishlist} />
                ))}
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Most Liked Comments by {user.name}</h2>
                {user.likedComments.map((comment, index) => (
                    <LikedComment key={index} {...comment} />
                ))}
            </div>
        </div>
    );
};

export default UserProfile;