<template>
    <div class="login_code">
        <div ref="tgsContainer" class="tgs-container"></div>
        <h1 class="login_code_title">Cloud password check</h1>
        <span class="login_code_text">Please enter your cloud password.</span>
        <form class="code_input_container" @submit.prevent="validateCode">
            <t-input v-model="password" placeholder="Please enter your cloud password." type="password" />
        </form>
        <div class="login_error">
            <span>{{ loginError }}</span>
        </div>
        <t-button class="login_button" @click="goToLoginCpassword" :loading="loginLoading"
            :disabled="loginLoading">Submit</t-button>
    </div>
    <div class="login_go">
        <router-link to="" class="span_Link">Forgot password?</router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadAnimation } from '@/utils/lottieTGS.js'


const password = ref('')
const loginError = ref('')
const tgsContainer = ref(null)
const router = useRouter()
const loginLoading = ref(false)


onMounted(() => {
    const animationPath = new URL('@/assets/TGS/monkey.tgs', import.meta.url).href;
    loadAnimation(tgsContainer, animationPath);
})


function goToLoginCpassword() {
    ipcRenderer.send('check-password', password.value)
}

ipcRenderer.on('loginError', (event, message) => {
    loginError.value = message
})
ipcRenderer.on('password-required', (event, hint) => {
    passwordHint.value = hint
    loginError.value = hint
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
    font-size: 13px;
    margin: 8px 0px;
    display: flex;
    align-items: center;
    justify-content: center;

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