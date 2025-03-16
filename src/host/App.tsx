import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';

// 懒加载远程组件
const RemoteApp = lazy(() => import('remote/RemoteApp'));
const RemoteButton = lazy(() => import('remote/RemoteButton'));

// 告诉 TypeScript 这些模块存在
declare module 'remote/RemoteApp';
declare module 'remote/RemoteButton';

const Home: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">主应用首页</h1>
    <p className="text-gray-700 mb-6">这是主应用的内容</p>
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">以下是远程组件：</h2>
      <Suspense fallback={<div className="p-4 text-center text-gray-500">加载远程按钮中...</div>}>
        <RemoteButton />
      </Suspense>
    </div>
  </div>
);

const Layout: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <header className="bg-gray-100 p-6 rounded-lg mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-4">森木微前端演示</h1>
        <nav>
          <ul className="flex space-x-6 justify-center">
            <li><Link to="/" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">主应用</Link></li>
            <li><Link to="/remote" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">远程应用</Link></li>
          </ul>
        </nav>
      </header>
      
      <main className="mb-8">
        <Outlet />
      </main>
      
      <footer className="mt-10 pt-4 text-center text-gray-500 border-t border-gray-200">
        <p>Webpack 5 Module Federation 示例 - React 19 + TypeScript + Tailwind CSS 4</p>
      </footer>
    </div>
  );
};

const RemoteAppWrapper: React.FC = () => (
  <Suspense fallback={<div className="p-8 text-center text-gray-500">加载远程应用中...</div>}>
    <RemoteApp />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "remote/*",
        element: <RemoteAppWrapper />
      }
    ]
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
