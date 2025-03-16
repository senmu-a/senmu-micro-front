import React, { useState } from 'react';

const Button: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  
  return (
    <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 text-center">
      <p className="text-gray-700 mb-3">来自远程应用的计数器：{count}</p>
      <button 
        className="bg-blue-500 text-white px-5 py-2 rounded transition-all duration-300 
                  hover:bg-blue-600 hover:shadow-md focus:ring-2 focus:ring-blue-300"
        onClick={() => setCount(count + 1)}
      >
        点击增加计数
      </button>
    </div>
  );
};

export default Button;
