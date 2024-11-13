[EN](README.md) | [中文](README_zh-CN.md)

## 注意

本项目处于开发阶段
你现在能构建 windsows 平台使用，但是现在还有很多 bug 需要等待修复。

## 描述

QTalkgram 是一个使用 Electron+Vue3+TDLib 的第三方客户端

## 关于

大家可以通过关注我们的频道 https://t.me/QTalkgramNew 来获取最新的开发进度以及与我联系。

## 开始

本项目基于[electron-vite](https://electron-vite.org/)构建，使用 npm 进行依赖管理。

### 配置环境

前往 https://my.telegram.org/apps 并注册一个新应用程序。

创建一个 .env 文件，并添加以下内容：

```.env
TELEGRAM_API_ID=12345678  # Telegram API ID
TELEGRAM_API_HASH=1234567abcdefghijkl # Telegram API Hash
```

### TDLib

为了与 Telegram 服务器通信，本项目使用 TDLib。
前往 https://github.com/tdlib/td 获取源码，编译参考官方[文档](https://tdlib.github.io/td/build.html?language=JavaScript)JavaScript 的 windsows(node.js)构建方法。
将构建好的`tdjson.dll` 文件放入 `resources/TDLib/bin` 目录下。

### 调试

```bash
npm install
npm run dev
```

## 技术栈

- [Vue](https://cn.vuejs.org/) (前端支持) MIT License
- [tdl](https://github.com/Bannerets/tdl#readme) (TDLib 的 JavaScript 包装器) MIT License
- [Pinia](https://pinia.vuejs.org/zh/) (状态管理) MIT License
- [TDLib](https://github.com/tdlib/td) (Telegram 数据库) BSL-1.0 license
- [axios](https://axios-http.com/) (用于网络请求) MIT License
- [Electron](https://www.electronjs.org/) (Electron 框架) MIT License
- [lottie-web](https://github.com/airbnb/lottie-web) (动画库) MIT License
- [Vue-router](https://router.vuejs.org/zh/) (路由管理) MIT License
- [electron-vite](https://electron-vite.org/) (打包工具) MIT License
- [styled-qr-code](https://github.com/KilianB/styled-qr-code) (用于生成二维码) MIT License
- [tdesign-vue-next](https://tdesign.tencent.com/) (腾讯 UI 组件库) MIT License
