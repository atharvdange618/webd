import React from 'react';

const CommentItem = ({ author, time, content }) => (
    <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div>
                    <h4 className="font-semibold text-sm">{author}</h4>
                    <p className="text-xs text-gray-500">{time}</p>
                </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
        <p className="text-sm text-gray-700">{content}</p>
    </div>
);

const CommentSection = () => {
    const comments = [
        {
            author: "Sarah Johnson",
            time: "2 days ago",
            content: "I've been experimenting with my LuminaCook Multi-Function Air Fryer for a few weeks now, and it's been a versatile addition to my kitchen. It's great for making crispy fries, chicken wings, and even some healthier options."
        },
        {
            author: "Alex Smith",
            time: "3 weeks ago",
            content: "I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my life. I used to spend hours every weekend cleaning my house, but now I can simply turn on this little robot and let it do the work. It's incredibly efficient, navigating around obstacles with ease. The only reason I didn't give it a perfect 5-star rating is that it occasionally gets stuck under low furniture. Overall, it's been a great addition to my home, saving me time and effort."
        },
        {
            author: "Emily Parker",
            time: "2 days ago",
            content: "The battery life is impressive, lasting me for long-haul flights without any issues. They are comfortable to wear for extended periods, and I appreciate the sleek design. Worth every penny, and I'd recommend these headphones to anyone who values high-quality audio and peace and quiet."
        }
    ];

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            {comments.map((comment, index) => (
                <CommentItem key={index} {...comment} />
            ))}
            <div className="mt-4">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Write a comment..."
                ></textarea>
            </div>
        </div>
    );
};

export default CommentSection;