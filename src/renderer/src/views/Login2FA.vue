<template>
    <div class="login_title drag">
        <t-button class="close_button">
            <img src="@/assets/icon/back.svg" alt="返回" width="20" height="20">
        </t-button>
        <t-button class="close_button no_drag" @click="minimizeWindow">
            <t-icon :size="15">
                <Minus />
            </t-icon>
        </t-button>
        <t-button class="close_button no_drag" id="close-btn" @click="closeWindow">
            <img src="@/assets/icon/close.svg" alt="关闭" width="20" height="20">
        </t-button>
    </div>
    <div class="login_code">
        <div ref="tgsContainer" class="tgs-container"></div>
        <h1 class="login_code_title">您的密码</h1>
        <span class="login_code_text">已启用两部验证，您的账户已受到额外密码的保护</span>
        <form class="code_input_container" @submit.prevent="validateCode">
            <t-input v-model="password" :placeholder="passwordHint" type="password" show-password />
        </form>
        <div class="login_error">
            <span>{{ loginError }}</span>
        </div>
        <t-button class="login_button" type="primary" @click="goToLoginCode">下一步</t-button>
    </div>
    <div class="login_go">
        <router-link to="/QRlogin" class="span_Link">是否忘记密码？</router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/store.js'
import { loadAnimation } from '@/utils/lottieTGS.js'
import { windowControls } from '@/utils/WindowsButton';


const password = ref('')
const loginError = ref('')
const tgsContainer = ref(null)
const router = useRouter()
const store = useStore()
const passwordHint = ref(store.hint)

const minimizeWindow = () => {
    windowControls.minimize(); // 最小化窗口
};
const closeWindow = () => {
    windowControls.close(); // 关闭窗口
};

onMounted(() => {
    const animationPath = new URL('@/assets/TGS/monkey.tgs', import.meta.url).href;
    loadAnimation(tgsContainer, animationPath);
})


function goToLoginCode() {
    ipcRenderer.send('check-password', password.value)
}

ipcRenderer.on('loginError', (event, message) => {
    loginError.value = '密码错误: ' + message
})
ipcRenderer.on('loginSuccess', (event, state) => {
    if (state === 'ready') {
        store.setPhoneNumber('')
        store.setHint('')
        router.push('/home')
    }
})
ipcRenderer.on('password-required', (event, hint) => {
    passwordHint.value = hint
    loginError.value = '请输入密码提示: ' + hint
})
</script>

<style scoped>
.login_title {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
    padding: 2px;
    margin-left: 5px;
    max-height: 25px;
}

.close_button {
    background: none;
    border: none;
    font-size: 15px;
    cursor: pointer;
    margin: 0;
    padding: 0 5px;
    margin: 0 5px;
}

.tgs-container {
    width: 150px;
    height: 150px;
}

.login_code {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}

.login_code_title {
    font-size: 20px;
    font-weight: 700;
    margin-top: 0px;
}

.login_code_text {
    font-size: 13px;
    color: rgb(144, 144, 144);
    margin-top: 10px;
    text-align: center;
    width: 90%;
}

.code_input_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 50px;
    gap: 10px;
    margin-top: 10px;
}

.login_button {
    width: 70%;
    margin-top: 5px;
}

.login_error {
    width: 100%;
    height: 0px;
    color: red;
    font-size: 15px;
    margin-top: 272px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
}

.login_go {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
}
</style>