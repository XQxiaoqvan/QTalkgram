<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Vue3NextQrcode } from 'vue3-next-qrcode'
import 'vue3-next-qrcode/es/style.css'
import logo from '@/assets/img/Logo.png'
import { windowControls } from '@/utils/WindowsButton';
import { RemoveIcon, CloseIcon, SettingIcon } from 'tdesign-icons-vue-next';
import { useStore } from '@/store/store' // 引入 store

const store = useStore() // 使用 store
const loading = ref(true)
const loginError = ref('')
const qrCodeUrl = ref('')
let intervalId = null
const router = useRouter()
const lang = ref({})

// 定义所有需要的语言键
const langKeys = [
    'lng_intro_qr_title',
    'lng_intro_qr_step1',
    'lng_intro_qr_step2',
    'lng_intro_qr_step3',
    'lng_intro_qr_skip'
]

function getState() {
    ipcRenderer.send('get-state')
}

// 接收并打印返回的状态
ipcRenderer.on('newState', (event, newState) => {
    console.log('Received newState:', newState);
});
// 按钮点击事件
const minimizeWindow = () => {
    windowControls.minimize(); // 最小化窗口
};
const closeWindow = () => {
    windowControls.close(); // 关闭窗口
};

onMounted(() => {
    loading.value = true // 开始加载时设置为true
    ipcRenderer.send('request-qr')
    ipcRenderer.send('get-state')

    // 获取语言包信息，传递所有需要的键
    ipcRenderer.send('get-language-pack', { languagePackId: store.language, keys: langKeys })
})

ipcRenderer.on('qr-link-required', (event, link) => {
    console.log('Received authorization link:', link)
    qrCodeUrl.value = link // 直接使用链接
    loading.value = false // 收到链接后设置为false
})

ipcRenderer.on('loginError', (event, error) => {
    console.error('QR Code Error:', error)
    loginError.value = error
})

ipcRenderer.on('loginSuccess', () => {
    console.log('收到登录成功')
    router.push('/home')
})

ipcRenderer.on('password-required', () => {
    router.push('/login/2fa')
})

ipcRenderer.on('code-required', () => {
    router.push('/login/code')
})

ipcRenderer.on('language-pack', (event, languagePack) => {
    // 将语言包数据映射到 lang 对象中
    const langData = {}
    languagePack.strings.forEach(item => {
        langData[item.key] = item.value.value
    })
    lang.value = langData
    console.log('语言包', lang.value)
})

onBeforeUnmount(() => {
    clearInterval(intervalId)
})

function requestPhoneLogin() {
    ipcRenderer.send('request-phone-login')
}
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
    <div style="user-select: none; ">
        <div class="login_container">
            <div class="login_QR">
                <div v-loading="loading"
                    style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
                    <Vue3NextQrcode @dragstart.prevent v-if="qrCodeUrl" :text="qrCodeUrl" :logoImage="logo"
                        :logoMargin="3" :size="200" :logoScale="0.2" :logoCornerRadius="10" />
                </div>
            </div>
            <div class=" login_error">
                <span>{{ loginError }}</span>
            </div>
            <h1 class="login_Heading Heading">{{ lang.lng_intro_qr_title }}</h1>
        </div>
        <div class="login_tips">
            <span>1.{{ lang.lng_intro_qr_step1 }}</span>
            <span>2.{{ lang.lng_intro_qr_step2 }}</span>
            <span>3.{{ lang.lng_intro_qr_step3 }}</span>
        </div>
    </div>
    <div style="user-select: none;" class="login_phone">
        <router-link to="/login" class="span_Link" @click.native="requestPhoneLogin">使用手机号登录</router-link>
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


.login_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
}

.login_QR {
    width: 210px;
    height: 210px;
    background-color: #f2f2f2;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
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

.login_Heading {
    font-size: 15px;
    font-weight: 400;
    padding: 2px;
    margin-left: 5px;
}

.login_tips {
    font-size: 15px;
    font-weight: 300;
    color: rgb(144, 144, 144);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-top: 0px;
    margin-left: 60px;
}

.login_tips span {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    /* 禁止换行 */
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    /* 超出部分省略 */

}

.login_phone {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    font-size: 14px;
}
</style>