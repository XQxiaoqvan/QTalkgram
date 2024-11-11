const { ipcMain } = require("electron");
import { log } from "console";
import { client } from "../client.js";
const fs = require("fs");

// 获取当前状态
ipcMain.on("get-state", async (event) => {
  const newState = await client.invoke({
    _: "getAuthorizationState",
  });
  event.sender.send("newState", newState);
});
// 手机号登录页面
ipcMain.on("login", async (event, formattedPhoneNumber) => {
  try {
    const newState = await client.invoke({
      _: "getAuthorizationState",
    });
    console.log("newState:", newState);
    if (newState._ === "authorizationStateWaitPhoneNumber") {
      await client.invoke({
        _: "setAuthenticationPhoneNumber",
        phone_number: formattedPhoneNumber,
      });
    } else if (newState._ === "authorizationStateWaitOtherDeviceConfirmation") {
      event.sender.send(
        "loginError",
        "当前状态在等待其他设备上扫码登录，无法使用手机号码登录",
      );
    }
  } catch (error) {
    console.error("set PhoneNumber error:", error);
    event.sender.send("loginError", error);
  }
});

// 验证码输入页面
ipcMain.on("check-code", async (event, code) => {
  console.log("收到验证码:", code);
  try {
    await client.invoke({
      _: "checkAuthenticationCode",
      code: code,
    });
    console.log("验证码正确");
  } catch (error) {
    console.error("验证码错误:", error);
    event.sender.send("loginError", error);
  }
});

// 2FA密码输入页面
ipcMain.on("check-password", async (event, password) => {
  console.log("收到密码:", password);
  try {
    await client.invoke({
      _: "checkAuthenticationPassword",
      password: password,
    });
    console.log("密码正确");
  } catch (error) {
    console.error("密码错误:", error);
    event.sender.send("loginError", error);
  }
});

// 请求二维码认证
ipcMain.on("request-qr", async (event) => {
  try {
    const newState = await client.invoke({
      _: "getAuthorizationState",
    });
    if (newState._ === "authorizationStateWaitOtherDeviceConfirmation") {
      event.sender.send("qr-link-required", newState.link);
    } else if (newState._ === "authorizationStateWaitPhoneNumber") {
      await client.invoke({
        _: "requestQrCodeAuthentication",
      });
    } else if (newState._ === "authorizationStateWaitPassword") {
      event.sender.send("password-required");
    } else if (newState._ === "authorizationStateReady") {
      event.sender.send("loginSuccess");
    }
  } catch (error) {
    console.error("请求QR码失败:", error);
    event.sender.send("loginError", error);
  }
});

// 切换到手机号登录
ipcMain.on("request-phone-login", async (event) => {
  try {
    await client.invoke({
      _: "logOut",
    });
    console.log("客户端已注销");
  } catch (error) {
    console.error("登出时出错:", error);
    event.sender.send("loginError", error.message);
  }
});

// 获取用户头像
ipcMain.on("get-user-avatar", async (event) => {
  try {
    const me = await client.invoke({
      _: "getMe",
    });
    // console.log('个人信息', JSON.stringify(me, null, 2))
    if (
      me.photo &&
      me.photo.big &&
      me.photo.big.local &&
      me.photo.big.local.path
    ) {
      // 如果本地路径存在，则不下载
      console.log("本地路径存在，不需要下载头像");
    } else if (
      me.photo &&
      me.photo.big &&
      me.photo.big.remote &&
      me.photo.big.remote.id
    ) {
      // 如果本地路径不存在，则下载头像
      me.avatarBase64 = await downloadAvatar(me.photo.big.remote.id);
    }
    event.sender.send("get-user-avatar-response", me); // 发送 me 对象到前端
  } catch (error) {
    console.error("获取用户头像失败:", error);
    event.sender.send("loginError", error);
  }
});

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
