const { ipcMain, app } = require("electron");
import { Key } from "@element-plus/icons-vue";
import { client } from "../client.js";
const fs = require("fs");

// 获取聊天列表
ipcMain.on("get-chats", async (event) => {
  try {
    const result = await client.invoke({
      _: "getChats",
      chat_list: { _: "chatListMain" },
      limit: 50,
    });
    const chatDetails = await Promise.all(
      result.chat_ids.map(async (chatId) => {
        const chat = await client.invoke({
          _: "getChat",
          chat_id: chatId,
        });
        // console.log('Chat列表', JSON.stringify(chat, null, 2))
        // 下载头像
        if (
          chat.photo &&
          chat.photo.big &&
          chat.photo.big.local &&
          chat.photo.big.local.path
        ) {
          // 如果本地路径存在，则不下载
          // console.log("本地路径存在，不需要下载头像");
        } else if (
          chat.photo &&
          chat.photo.big &&
          chat.photo.big.remote &&
          chat.photo.big.remote.id
        ) {
          // 如果本地路径不存在，则下载头像
          chat.avatarBase64 = await downloadAvatar(chat.photo.big.remote.id);
        }

        return chat;
      }),
    );
    event.sender.send("update-chats", chatDetails);
  } catch (error) {
    console.error("获取聊天列表失败:", error);
    event.sender.send("loginError", error);
  }
});

async function getBase64Image(filePath) {
  try {
    const data = await fs.promises.readFile(filePath);
    return data.toString("base64");
  } catch (error) {
    console.error("读取文件失败:", error);
    return null;
  }
}

async function downloadAvatar(remoteFileId) {
  try {
    // 获取文件信息
    let file = await client.invoke({
      _: "getRemoteFile",
      remote_file_id: remoteFileId,
    });

    if (!file.local.is_downloading_completed) {
      await client.invoke({
        _: "downloadFile",
        file_id: file.id,
        priority: 1,
      });

      file = await client.invoke({
        _: "getFile",
        file_id: file.id,
      });
    }

    if (file.local.is_downloading_completed) {
      const data = await fs.promises.readFile(file.local.path);
      return data.toString("base64");
    } else {
      throw new Error("文件下载未完成");
    }
  } catch (error) {
    console.error("下载头像失败:", error);
    return null;
  }
}
