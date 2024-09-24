<script setup>
import { ref, onMounted } from 'vue'
import { loadAnimation } from '@/utils/lottieTGS.js'


const phoneNumber = ref('')
const tgsContainer = ref(null)
const loginError = ref('')
const loginLoading = ref(false)
function goToLoginCode() {
    let formattedPhoneNumber = phoneNumber.value
    if (typeof formattedPhoneNumber !== 'string') {
        formattedPhoneNumber = String(formattedPhoneNumber)
    }
    if (!formattedPhoneNumber.startsWith('+')) {
        formattedPhoneNumber = `+${formattedPhoneNumber}`
    }
    loginLoading.value = true
    ipcRenderer.send('login', formattedPhoneNumber)
}

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
    <div class="login_content">
        <div ref="tgsContainer" class="tgs-container"></div>
        <h1 class="login_content_title Heading">Your Phone</h1>
        <span class="login_content_text">Please confirm your country code
            and enter your phone number.</span>
        <t-input-number class="login_input" v-model="phoneNumber" style="width: 240px" theme="normal" label="+"
            placeholder="" :status="loginError ? 'error' : null" clearable :disabled="loginLoading" />
        <div class="login_error">
            <span>{{ loginError }}</span>
        </div>
        <t-button class="login_button" @click="goToLoginCode" :loading="loginLoading"
            :disabled="loginLoading">NEXT</t-button>
    </div>
    <div class="login_QR">
        <router-link to="/login/QRlogin" class="span_Link">Quick log in using QR code</router-link>
    </div>
</template>

<style scoped>
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
    text-align: center;
    width: 90%;
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