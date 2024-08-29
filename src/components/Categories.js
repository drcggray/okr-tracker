import React from 'react';

const Categories = ({ categories, currentCategory, setCurrentCategory }) => {
  return (
    <div className="flex flex-wrap justify-center mb-4">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setCurrentCategory(category)}
          className={`m-1 px-4 py-2 rounded ${
            currentCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;