const tdl = require('tdl')
const path = require('path')
const os = require('os')
import { mainWindow } from '../index.js'
const fs = require('fs')
const koffi = require('koffi')
require('dotenv').config()

// const getTdjson = path.resolve(__dirname, '../../../TDLib/bin/tdjson.dll')

const getTdjson = path.resolve(__dirname, '../../resources/TDLib/bin/tdjson.dll')
const tdjsonPah = koffi.load(getTdjson)

tdl.configure({ tdjson: getTdjson, verbosityLevel: 1 })
function createClient() {
  return tdl.createClient({
    apiId: process.env.TELEGRAM_API_ID,
    apiHash: process.env.TELEGRAM_API_HASH,
    // useTestDc: true,
    tdlibParameters: {
      device_model: os.type(),
      system_version: os.release(),
      application_version: '0.0.1-Dev(10001)'
    }
  })
}
let client = createClient()
async function login() {
  try {
    for await (const update of client.iterUpdates()) {
      // console.log('update:', update)
      if (update._ !== 'updateAuthorizationState') continue
      const authorizationState = update.authorization_state
      switch (authorizationState._) {
        case 'authorizationStateWaitPhoneNumber':
          console.log('PhoneNumber...')
          break
        case 'authorizationStateWaitOtherDeviceConfirmation':
          console.log('LoginQR:', update.authorization_state.link)
          mainWindow.webContents.send('qr-link-required', update.authorization_state.link)
          break
        case 'authorizationStateWaitEmailAddress':
          console.log('EmailAddress...')
          mainWindow.webContents.send(
            'loginError',
            '等待设置邮箱，但该界面并没有开发，请在官方客户端设置后登录'
          )
          break
        case 'authorizationStateWaitEmailCode':
          console.log('EmailCode...')
          mainWindow.webContents.send(
            'loginError',
            '等待邮箱验证码，但该界面并没有开发，请在使用扫码登录'
          )
          break
        case 'authorizationStateWaitCode':
          console.log('Code...')
          mainWindow.webContents.send('code-required')
          break
        case 'authorizationStateWaitPassword':
          console.log('2FAPassword...')
          mainWindow.webContents.send('password-required')
          break
        case 'authorizationStateReady':
          console.log('login success')
          mainWindow.webContents.send('loginSuccess')
          console.log('登录成功')
          break // Success
        case 'authorizationStateLoggingOut':
          console.log('LoggingOut...')
          break
        case 'authorizationStateClosed':
          console.log('认证状态已关闭。重新初始化客户端...')
          await client.close()
          client = createClient()
          await login()
          break
        default:
          console.warn('Other states:', authorizationState)
      }
    }
  } catch (error) {
    console.error('login error:', error)
    throw new Error('Failed to log in')
  }
}

;(async function () {
  await login()
  console.log('Logged in')
  await client.close()
})()

export { client }
