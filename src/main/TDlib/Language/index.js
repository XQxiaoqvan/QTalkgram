const { ipcMain } = require('electron')
import { client } from '../client.js'

async function initializeLocalization() {
  await client.invoke({
    _: 'setOption',
    name: 'localization_target',
    value: { _: 'optionValueString', value: 'tdesktop' }
  })
} // 调用初始化函数

ipcMain.on('get-language-pack', async (event, { languagePackId, keys }) => {
  try {
    initializeLocalization()
    const languagePackInfo = await client.invoke({
      _: 'getLanguagePackInfo',
      language_pack_id: languagePackId
    })
    console.log('语言包信息', languagePackInfo)
    const languagePack = await client.invoke({
      _: 'getLanguagePackStrings',
      language_pack_id: languagePackId,
      keys: keys
    })
    console.log('语言包', JSON.stringify(languagePack, null, 2))
    event.sender.send('language-pack', languagePack)
  } catch (error) {
    console.error('获取语言包时出错', error)
    event.sender.send('language-pack-error', error.message)
  }
})
