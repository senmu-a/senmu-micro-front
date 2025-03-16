# 森木微前端演示项目

这个项目展示了使用 Webpack 5 的 Module Federation (模块联邦) 特性来构建微前端架构的实践方法。

## 技术栈

- React 19
- TypeScript
- Webpack 5 (Module Federation)
- Tailwind CSS 4
- React Router 7

## 项目概述

本项目包含两个应用：

1. **主应用 (Host)**: 运行在 http://localhost:3000
2. **远程应用 (Remote)**: 运行在 http://localhost:3001

主应用可以动态加载并使用远程应用中的组件，展示了微前端架构的核心能力。

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行项目

```bash
# 同时启动主应用和远程应用
npm start

# 单独启动主应用
npm run start:host

# 单独启动远程应用
npm run start:remote
```

### 构建项目

```bash
npm run build
```

## 项目结构

```
senmu-micro-front/
├── src/
│   ├── host/              # 主应用源码
│   │   ├── App.tsx        # 主应用入口组件
│   │   ├── index.html     # 主应用HTML模板
│   │   ├── index.tsx      # 主应用入口文件
│   │   └── styles.css     # 主应用样式
│   ├── remote/            # 远程应用源码
│   │   ├── App.tsx        # 远程应用入口组件
│   │   ├── components/    # 远程应用组件
│   │   ├── index.html     # 远程应用HTML模板
│   │   ├── index.tsx      # 远程应用入口文件
│   │   └── styles.css     # 远程应用样式
│   ├── tailwind.css       # Tailwind入口文件
│   └── types.d.ts         # 类型声明
├── webpack.host.js        # 主应用Webpack配置
├── webpack.remote.js      # 远程应用Webpack配置
├── tailwind.config.js     # Tailwind配置
├── postcss.config.js      # PostCSS配置
├── tsconfig.json          # TypeScript配置
└── package.json           # 项目依赖和脚本
```

## 模块联邦(Module Federation)详解

### 什么是模块联邦?

模块联邦是Webpack 5引入的一项革命性特性，它允许JavaScript应用在运行时动态加载并使用其他应用的代码，就像使用自己的模块一样。这使得我们可以将前端应用拆分成多个相对独立的部分，每个部分可以独立开发、构建和部署，同时又能在运行时无缝集成。

### 核心概念

- **Host(主机应用)**: 消费远程模块的应用
- **Remote(远程应用)**: 暴露模块供其他应用使用的应用
- **Remote Entry**: 远程应用的入口文件，包含模块映射和加载机制
- **Exposed Modules**: 远程应用暴露给外部的模块
- **Shared Dependencies**: 各应用之间共享的依赖

### 配置详解

#### 远程应用配置 (webpack.remote.js)

```javascript
new ModuleFederationPlugin({
  name: 'remote',          // 应用标识名，供Host引用
  filename: 'remoteEntry.js', // 入口文件名
  exposes: {               // 暴露的模块
    './RemoteApp': './src/remote/App.tsx',
    './RemoteButton': './src/remote/components/Button.tsx',
  },
  shared: {                // 共享依赖
    react: { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
    'react-router-dom': { singleton: true, requiredVersion: '^7.0.0' },
  },
})
```

#### 主应用配置 (webpack.host.js)

```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {              // 远程应用引用
    remote: 'remote@http://localhost:3001/remoteEntry.js',
  },
  shared: {               // 共享依赖声明
    react: { singleton: true, eager: true, requiredVersion: '^19.0.0' },
    'react-dom': { singleton: true, eager: true, requiredVersion: '^19.0.0' },
    'react-router-dom': { singleton: true, eager: true, requiredVersion: '^7.0.0' },
  },
})
```

#### 共享依赖配置选项

- **singleton**: 确保整个应用中只加载一个依赖实例
- **eager**: 是否立即加载依赖，而非异步加载
- **requiredVersion**: 指定依赖的版本范围
- **strictVersion**: 是否强制版本严格匹配

### 在主应用中使用远程模块

```javascript
// 使用React的lazy加载远程组件
const RemoteApp = lazy(() => import('remote/RemoteApp'));
const RemoteButton = lazy(() => import('remote/RemoteButton'));

// 使用Suspense进行加载状态处理
<Suspense fallback={<div>加载中...</div>}>
  <RemoteButton />
</Suspense>
```

### 模块联邦的优势

1. **独立开发与部署**: 各团队可以独立开发和部署自己的应用
2. **代码共享**: 避免代码复制粘贴，提高复用性
3. **运行时集成**: 在运行时而非构建时集成代码
4. **渐进式迁移**: 支持旧系统与新系统的逐步迁移
5. **动态更新**: 无需重新部署整个应用即可更新部分功能

### 常见问题

#### 跨仓库模块共享

即使将remote项目拆分到另一个独立的仓库中，依然可以共享模块。只需要将主应用中的remote配置指向新部署位置：

```javascript
remotes: {
  remote: 'remote@http://另一个仓库的部署地址/remoteEntry.js',
},
```

这种分离部署是微前端架构的常见实践，允许不同团队独立开发、部署各自的微应用。

#### 依赖重复问题

将远程应用拆分到另一个仓库后，确实需要在两个仓库中分别安装依赖，但通过Module Federation的`shared`配置，这些依赖在运行时只会加载一次，避免了重复加载问题。

## 最佳实践

1. **版本控制**: 严格管理共享依赖的版本
2. **错误处理**: 为远程模块加载失败添加适当的回退机制
3. **类型定义**: 为远程模块提供TypeScript类型定义
4. **性能优化**: 合理设置共享模块，避免不必要的重复加载
5. **构建优化**: 考虑使用CDN分发远程入口文件

## 学习资源

- [Webpack 5 Module Federation 官方文档](https://webpack.js.org/concepts/module-federation/)
- [Module Federation 示例](https://github.com/module-federation/module-federation-examples)
- [Micro-Frontends with Module Federation](https://www.youtube.com/watch?v=D3XYAx30CNc)