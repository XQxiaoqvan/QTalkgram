const { ipcMain } = require('electron')
import { log } from 'console'
import { client } from '../client.js'
const fs = require('fs')

// 获取当前状态
ipcMain.on('get-state', async (event) => {
  const newState = await client.invoke({
    _: 'getAuthorizationState'
  })
  event.sender.send('newState', newState)
})
// 手机号登录页面
ipcMain.on('login', async (event, formattedPhoneNumber) => {
  try {
    const newState = await client.invoke({
      _: 'getAuthorizationState'
    })
    console.log('newState:', newState)
    if (newState._ === 'authorizationStateWaitPhoneNumber') {
      await client.invoke({
        _: 'setAuthenticationPhoneNumber',
        phone_number: formattedPhoneNumber
      })
    } else if (newState._ === 'authorizationStateWaitOtherDeviceConfirmation') {
      event.sender.send('loginError', '当前状态在等待其他设备上扫码登录，无法使用手机号码登录')
    }
  } catch (error) {
    console.error('set PhoneNumber error:', error)
    event.sender.send('loginError', error)
  }
})

// 验证码输入页面
ipcMain.on('check-code', async (event, code) => {
  console.log('收到验证码:', code)
  try {
    await client.invoke({
      _: 'checkAuthenticationCode',
      code: code
    })
    console.log('验证码正确')
  } catch (error) {
    console.error('验证码错误:', error)
    event.sender.send('loginError', error)
  }
})

// 2FA密码输入页面
ipcMain.on('check-password', async (event, password) => {
  console.log('收到密码:', password)
  try {
    await client.invoke({
      _: 'checkAuthenticationPassword',
      password: password
    })
    console.log('密码正确')
  } catch (error) {
    console.error('密码错误:', error)
    event.sender.send('loginError', error)
  }
})

// 请求二维码认证
ipcMain.on('request-qr', async (event) => {
  try {
    const newState = await client.invoke({
      _: 'getAuthorizationState'
    })
    if (newState._ === 'authorizationStateWaitOtherDeviceConfirmation') {
      event.sender.send('qr-link-required', newState.link)
    } else if (newState._ === 'authorizationStateWaitPhoneNumber') {
      await client.invoke({
        _: 'requestQrCodeAuthentication'
      })
    } else if (newState._ === 'authorizationStateWaitPassword') {
      event.sender.send('password-required')
    } else if (newState._ === 'authorizationStateReady') {
      event.sender.send('loginSuccess')
    }
  } catch (error) {
    console.error('请求QR码失败:', error)
    event.sender.send('loginError', error)
  }
})

// 切换到手机号登录
ipcMain.on('request-phone-login', async (event) => {
  try {
    await client.invoke({
      _: 'logOut'
    })
    console.log('客户端已注销')
  } catch (error) {
    console.error('登出时出错:', error)
    event.sender.send('loginError', error.message)
  }
})

// 获取用户头像
ipcMain.on('get-user-avatar', async (event) => {
  try {
    const me = await client.invoke({
      _: 'getMe'
    })
    // console.log('个人信息', JSON.stringify(me, null, 2))
    const userProfilePhotos = await client.invoke({
      _: 'getUserProfilePhotos',
      user_id: me.id,
      limit: 1
    })
    console.log(userProfilePhotos)

    let photoPath = null
    if (userProfilePhotos.photos?.[0]?.sizes?.[0]?.photo) {
      const file = await client.invoke({
        _: 'getFile',
        file_id: userProfilePhotos.photos[0].sizes[0].photo.id
      })
      if (file.local.is_downloading_completed) {
        photoPath = file.local.path
      } else {
        await client.invoke({
          _: 'downloadFile',
          file_id: userProfilePhotos.photos[0].sizes[0].photo.id,
          priority: 1
        })
        const downloadedFile = await client.invoke({
          _: 'getFile',
          file_id: userProfilePhotos.photos[0].sizes[0].photo.id
        })

        if (downloadedFile.local.is_downloading_completed) {
          photoPath = downloadedFile.local.path
        }
      }
    }

    const photoBase64 = photoPath ? await getBase64Image(photoPath) : null
    const avatarData = {
      userId: me.id,
      photoBase64,
      username: me.username,
      displayName: me.first_name.charAt(0)
    }
    event.sender.send('user-avatar', avatarData)
  } catch (error) {
    console.error('获取用户头像失败:', error)
    event.sender.send('loginError', error)
  }
})

async function getBase64Image(filePath) {
  try {
    const data = await fs.promises.readFile(filePath)
    return data.toString('base64')
  } catch (error) {
    console.error('读取文件失败:', error)
    return null
  }
}
ipcMain.on('get-user-avatar', async (event) => {
  try {
    const hatHistory = await client.invoke({
      _: 'getChatHistory',
      chat_id: -1002200641828,
      from_message_id: 0,
      offset: 0,
      limit: 99,
      only_local: false
    })
    console.log('最后一条消息:', JSON.stringify(hatHistory, null, 2))
    const lastMessage = await client.invoke({
      _: 'getChatHistory',
      chat_id: -1002200641828,
      from_message_id: hatHistory.messages.id,
      offset: 0,
      limit: 99,
      only_local: false
    })
    console.log('遍历的消息:', JSON.stringify(lastMessage, null, 2))
  } catch (error) {
    console.error('失败:', error)
  }
})
