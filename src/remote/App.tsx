import React from 'react';
import Button from './components/Button';

const App: React.FC = () => {
  return (
    <div className="p-6 bg-blue-50 rounded-lg mb-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-3">远程应用</h1>
      <p className="text-gray-600 mb-6">这是一个独立的远程应用，可以被主应用集成。</p>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-700 pb-3 border-b border-gray-200 mb-4">远程应用功能</h2>
        <p className="text-gray-600 mb-4">这个组件来自远程应用：</p>
        <Button />
      </div>
    </div>
  );
};

export default App;
