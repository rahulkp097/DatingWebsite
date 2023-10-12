import React from 'react';

function Home() {
  // Define a list of images (you can replace these with actual image URLs)
  const imageUrls = [
    'https://cdn.mos.cms.futurecdn.net/au6CrySufWyuM9AurXh84e.jpg',
    'https://cdn.mos.cms.futurecdn.net/au6CrySufWyuM9AurXh84e.jpg',
    'https://cdn.mos.cms.futurecdn.net/au6CrySufWyuM9AurXh84e.jpg',
    'https://cdn.mos.cms.futurecdn.net/au6CrySufWyuM9AurXh84e.jpg',
    'https://cdn.mos.cms.futurecdn.net/au6CrySufWyuM9AurXh84e.jpg',
    'https://cdn.mos.cms.futurecdn.net/au6CrySufWyuM9AurXh84e.jpg',
    'https://cdn.mos.cms.futurecdn.net/au6CrySufWyuM9AurXh84e.jpg',
    
    // Add more image URLs here
  ];

  return (
    <div className="bg-blue-200 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-black mb-4">Welcome to the Dating App</h1>
      <p className="text-lg text-white">Find your perfect match!</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="relative">
            <img
              src={imageUrl}
              alt={`User ${index}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 p-2 bg-white bg-opacity-80 rounded-br-lg">
              User {index + 1}
            </div>
          </div>
        ))}
      </div>
      
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 mt-6">
        Get Started
      </button>
    </div>
  );
}

export default Home;
