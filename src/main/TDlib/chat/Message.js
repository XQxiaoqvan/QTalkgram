import { client } from '../client.js'
import { ipcMain } from 'electron'

// 获取聊天列表
ipcMain.on('get-Message', async (event, newChatId) => {
  try {
    console.log('获取最后一条消息')
    // 获取最后一条消息
    const hatHistory = await client.invoke({
      _: 'getChatHistory',
      chat_id: newChatId,
      from_message_id: 0,
      offset: 0,
      limit: 99,
      only_local: false
    })
    // console.log('最后一条消息:', JSON.stringify(hatHistory, null, 2))
    const message = await client.invoke({
      _: 'getChatHistory',
      chat_id: newChatId,
      from_message_id: hatHistory.messages.id,
      offset: 0,
      limit: 99,
      only_local: false
    })
    // console.log('遍历的消息:', JSON.stringify(message, null, 2))
    event.sender.send('lastMessage', message)
  } catch (error) {
    console.error('获取消息失败:', error)
    event.sender.send('Error', error)
  }
})

ipcMain.on('get-user', async (event, user_id) => {
  console.log('获取用户')
  try {
    const user = await client.invoke({
      _: 'getUser',
      user_id: user_id
    })
    // console.log('用户信息:', JSON.stringify(user, null, 2))
    event.sender.send('user-info', user)
  } catch (error) {
    console.error('获取用户信息失败:', error)
    event.sender.send('Error', error)
  }
})
