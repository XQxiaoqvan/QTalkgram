import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import './TDlib/index.js'

const login_width = 320
const login_height = 448
const chat_width = 980
const chat_height = 620
const min_width = 700
const min_height = 500

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: login_width,
    height: login_height,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    resizable: false,
    frame: false,
    transparent: false,
    maximizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })

  mainWindow.webContents.openDevTools() // devtools
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 基于 electron-vite cli 的渲染器热模块替换
  // 在开发环境加载远程URL，在生产环境加载本地HTML文件
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
// 导出 mainWindow
export { mainWindow }
// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
// 一些API只能在此事件发生后使用
app.whenReady().then(() => {
  // 为Windows设置应用程序用户模型ID
  electronApp.setAppUserModelId('com.electron')

  createWindow()

  // 在开发环境中默认通过F12打开或关闭开发者工具
  // 在生产环境中忽略CommandOrControl + R
  // 参见 https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('chatwindow', (e, chatwindow) => {
    mainWindow.setResizable(true)
    if (chatwindow) {
      mainWindow.setSize(chat_width, chat_height)
      mainWindow.setMinimumSize(min_width, min_height)
      mainWindow.center()
      mainWindow.setResizable(true)
      mainWindow.webContents.send('chatwindow', chatwindow)
    } else {
      mainWindow.setSize(login_width, login_height)
      mainWindow.center()
      mainWindow.webContents.send('chatwindow', chatwindow)
      mainWindow.setResizable(false)
    }
  })

  app.on('activate', function () {
    // 在macOS上，当点击dock图标并且没有其他窗口打开时，通常会重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口关闭时退出应用程序，除了在macOS上
// 在macOS上，应用程序及其菜单栏通常会保持活动状态，直到用户按Cmd + Q显式退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中可以包含应用程序的其他主进程代码
// 你也可以将它们放在单独的文件中并在此处require它们

// 监听最小化窗口的 IPC 消息
ipcMain.on('minimize-window', () => {
  console.log('minimize-window')
  if (mainWindow) {
    mainWindow.minimize()
  }
})

// 监听放大窗口的 IPC 消息
ipcMain.on('maximize-window', () => {
  console.log('maximize-window')
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  }
})

// 监听关闭窗口的 IPC 消息
ipcMain.on('close-window', () => {
  console.log('close-window')
  if (mainWindow) {
    mainWindow.close()
  }
})
