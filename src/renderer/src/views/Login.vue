<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/store.js'
import { loadAnimation } from '@/utils/lottieTGS.js'
import { windowControls } from '@/utils/WindowsButton';
import { RemoveIcon, CloseIcon, SettingIcon } from 'tdesign-icons-vue-next';

const phoneNumber = ref('')
const tgsContainer = ref(null)
const router = useRouter()
const store = useStore()
const loginError = ref('')
const loginLoading = ref(false)


// 按钮点击事件
const minimizeWindow = () => {
    windowControls.minimize(); // 最小化窗口
};
const closeWindow = () => {
    windowControls.close(); // 关闭窗口
};
onMounted(() => {
    store.setPhoneNumber('')
})
function getState() {
    ipcRenderer.send('get-state')
}
function goToLoginCode() {
    let formattedPhoneNumber = phoneNumber.value
    if (typeof formattedPhoneNumber !== 'string') {
        formattedPhoneNumber = String(formattedPhoneNumber)
    }
    if (!formattedPhoneNumber.startsWith('+')) {
        formattedPhoneNumber = `+${formattedPhoneNumber}`
    }
    store.setPhoneNumber(formattedPhoneNumber)
    loginLoading.value = true
    ipcRenderer.send('login', formattedPhoneNumber)
}
// 接收并打印返回的状态
ipcRenderer.on('newState', (event, newState) => {
    console.log('Received newState:', newState);
});
ipcRenderer.on('password-required', (event, hint) => {
    loginLoading.value = false
    store.setHint(hint)
    router.push({ name: 'Login2FA' })
})

ipcRenderer.on('code-required', () => {
    loginLoading.value = false
    router.push('/login/code')
})

ipcRenderer.on('login-success', () => {
    loginLoading.value = false
    router.push('/home')
})

ipcRenderer.on('loginError', (event, message) => {
    console.error('Login error:', message)
    if (message === 'Request aborted') {
        loginError.value = '登录错误: 请求被中止'
    } else {
        loginError.value = message
    }
    loginLoading.value = false
})
onMounted(() => {
    const animationPath = new URL('@/assets/TGS/Duck2024.tgs', import.meta.url).href;
    loadAnimation(tgsContainer, animationPath);
})
</script>

<template>
    <div class="drag_bar drag">
        <div class="drag_icon no_drag" @click="getState">
            <SettingIcon />
        </div>
        <div class="drag_icon no_drag" @click="minimizeWindow">
            <RemoveIcon />
        </div>
        <div class="drag_icon_close no_drag" @click="closeWindow">
            <CloseIcon />
        </div>
    </div>
    <div class="login_content">
        <div ref="tgsContainer" class="tgs-container"></div>
        <h1 class="login_content_title Heading">您的手机号码</h1>
        <span class="login_content_text">请确认您的国际电话区号并输入您的手机号码。</span>
        <t-input-number class="login_input" v-model="phoneNumber" style="width: 240px" theme="normal" label="+"
            placeholder="输入你的号码" :status="loginError ? 'error' : null" clearable :disabled="loginLoading" />
        <div class="login_error">
            <span>{{ loginError }}</span>
        </div>
        <t-button class="login_button" @click="goToLoginCode" :loading="loginLoading"
            :disabled="loginLoading">下一步</t-button>
    </div>
    <div class="login_QR">
        <router-link to="/QRlogin" class="span_Link">扫码二维码快速登录</router-link>
    </div>
</template>

<style scoped>
.drag_bar {
    /* background-color: rgb(0, 204, 255); */
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #ffffff;

    .drag_icon,
    .drag_icon_close {
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .drag_icon:hover {
        background-color: #dcdcdc;
        height: 100%;
    }

    .drag_icon_close:hover {
        background-color: #ff0000;
        height: 100%;
        color: #fff;
    }
}


.tgs-container {
    width: 200px;
    height: 200px;
}

.login_content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login_content_title {
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
}

.login_content_text {
    font-size: 13px;
    font-weight: 300;
    color: rgb(144, 144, 144);
    margin-top: 10px;
}

.login_input {
    margin-top: 10px;
}

.login_error {
    width: 100%;
    height: 20px;
    color: red;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login_button {
    width: 240px;
}

.login_QR {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    font-size: 14px;
}
</style>