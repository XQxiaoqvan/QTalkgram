[EN](README.md) | [中文](README_zh-CN.md)

## Note

This project is under development.

## Description

Gramix is a third-party client using Electron+Vue3+TDLib.

## About

You can follow our channel at https://t.me/QTalkgramNew to get the latest development updates and contact me.

## Getting Started

This project is built with [electron-vite](https://electron-vite.org/) and uses npm for dependency management.

### Environment Configuration

Go to https://my.telegram.org/apps and register a new application.

Create a `.env` file and add the following content:

```.env
TELEGRAM_API_ID=12345678  # Telegram API ID
TELEGRAM_API_HASH=1234567abcdefghijkl # Telegram API Hash
```

### TDLib

To communicate with the Telegram server, this project uses TDLib.
Go to https://github.com/tdlib/td to get the source code and refer to the official [documentation](https://tdlib.github.io/td/build.html?language=JavaScript) for the JavaScript Windows (node.js) build method.
Place the built `tdjson.dll` file in the `resources/TDLib/bin` directory.

### Debugging

```bash
npm install
npm run dev
```

## Tech Stack

- [Vue](https://vuejs.org/) (Frontend support) MIT License
- [tdl](https://github.com/Bannerets/tdl#readme) (JavaScript wrapper for TDLib) MIT License
- [Pinia](https://pinia.vuejs.org/) (State management) MIT License
- [TDLib](https://github.com/tdlib/td) (Telegram database) BSL-1.0 license
- [axios](https://axios-http.com/) (For network requests) MIT License
- [Electron](https://www.electronjs.org/) (Electron framework) MIT License
- [lottie-web](https://github.com/airbnb/lottie-web) (Animation library) MIT License
- [Vue-router](https://router.vuejs.org/) (Routing management) MIT License
- [electron-vite](https://electron-vite.org/) (Packaging tool) MIT License
- [styled-qr-code](https://github.com/KilianB/styled-qr-code) (For generating QR codes) MIT License
- [tdesign-vue-next](https://tdesign.tencent.com/) (Tencent UI component library) MIT License

```

```
