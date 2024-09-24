import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const login_width = 320
const login_height = 448
const chat_width = 980
const chat_height = 620
const min_width = 700
const min_height = 500

let mainWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: login_width, // Set window width / 设置窗口宽度
    height: login_height, // Set window height / 设置窗口高度
    show: false, // Initially do not display the window / 初始不显示窗口
    autoHideMenuBar: true, // Automatically hide the menu bar / 自动隐藏菜单栏
    titleBarStyle: 'hidden', // Hide the title bar style / 隐藏标题栏样式
    resizable: false, // Do not allow resizing the window / 调整窗口大小
    frame: false, // Do not display the border / 不显示边框
    transparent: false, // Not transparent / 不透明
    maximizable: false, // Do not allow maximization / 不允许最大化
    ...(process.platform === 'linux' ? { icon } : {}), // Set icon based on platform / 根据平台设置图标
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'), // Preload script path / 预加载脚本路径
      sandbox: false, // Do not use sandbox mode / 不使用沙盒模式
      contextIsolation: false, // Do not isolate context / 不隔离上下文
      enableRemoteModule: true, // Enable remote module / 启用远程模块
      nodeIntegration: true // Enable node integration / 启用节点集成
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// Listen for IPC messages to minimize the window / 最小化窗口的 IPC 消息
ipcMain.on('minimize-window', () => {
  console.log('minimize-window')
  if (mainWindow) {
    mainWindow.minimize()
  }
})
// Listen for IPC messages to maximize the window / 放大窗口的 IPC 消息
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

// Listen for IPC messages to close the window / 关闭窗口的 IPC 消息
ipcMain.on('close-window', () => {
  console.log('close-window')
  if (mainWindow) {
    mainWindow.close()
  }
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
    mainWindow.setMinimumSize(login_width, login_height)
    mainWindow.setSize(login_width, login_height)
    mainWindow.center()
    mainWindow.webContents.send('chatwindow', chatwindow)
    mainWindow.setResizable(false)
  }
})
