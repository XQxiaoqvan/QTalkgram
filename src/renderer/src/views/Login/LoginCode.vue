<template>
    <div class="login_code">
        <div ref="tgsContainer" class="tgs-container"></div>
        <h1 class="login_code_title">Code</h1>
        <span class="login_code_text">We've sent an activation code to your phone.
            Please enter it below.</span>
        <form class="code_input_container" @submit.prevent="validateCode">
            <input class="code_input_item" v-model="code[0]" @input="validateAndFocusNext(0)"
                @keydown="focusPrev($event, 0)" @focus="focusFirstEmpty(0)" maxlength="1" placeholder=""></input>
            <input class="code_input_item" v-model="code[1]" @input="validateAndFocusNext(1)"
                @keydown="focusPrev($event, 1)" @focus="focusFirstEmpty(1)" maxlength="1" placeholder=""></input>
            <input class="code_input_item" v-model="code[2]" @input="validateAndFocusNext(2)"
                @keydown="focusPrev($event, 2)" @focus="focusFirstEmpty(2)" maxlength="1" placeholder=""></input>
            <input class="code_input_item" v-model="code[3]" @input="validateAndFocusNext(3)"
                @keydown="focusPrev($event, 3)" @focus="focusFirstEmpty(3)" maxlength="1" placeholder=""></input>
            <input class="code_input_item" v-model="code[4]" @input="validateAndFocusNext(4)"
                @keydown="focusPrev($event, 4)" @focus="focusFirstEmpty(4)" maxlength="1" placeholder=""></input>
        </form>
        <div class="login_error">
            <span>{{ loginError }}</span>
        </div>
    </div>
    <div class="login_QR">
        <router-link to="" class="span_Link">back</router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadAnimation } from '@/utils/lottieTGS.js'


const code = ref(['', '', '', '', ''])
const loginError = ref('')
const tgsContainer = ref(null)
const router = useRouter()

ipcRenderer.on('newState', (event, newState) => {
    console.log('Received newState:', newState);
});
const validateAndFocusNext = (index) => {
    const value = code.value[index]
    if (!/^\d$/.test(value)) {
        code.value[index] = ''
    } else {
        document.querySelectorAll('.code_input_item').forEach((input) => {
            input.style.outline = ''
        })
        if (index < code.value.length - 1) {
            document.querySelectorAll('.code_input_item')[index + 1].focus()
        } else if (index === code.value.length - 1) {
            validateCode()
        }
    }
}


const focusPrev = (event, index) => {
    if (event.key === 'Backspace' && code.value[index] === '' && index > 0) {
        document.querySelectorAll('.code_input_item')[index - 1].focus()
    }
}


const focusFirstEmpty = (index) => {
    for (let i = 0; i <= index; i++) {
        if (code.value[i] === '') {
            document.querySelectorAll('.code_input_item')[i].focus()
            break
        }
    }
}


const validateCode = () => {
    const enteredCode = code.value.join('')
    ipcRenderer.send('check-code', enteredCode)
}


const animateSuccess = () => {
    document.querySelectorAll('.code_input_item').forEach((input, index) => {
        setTimeout(() => {
            input.style.outline = '1.5px solid #00FF7F'
        }, index * (50 + index * 10))
    })
}


const animateError = () => {
    document.querySelectorAll('.code_input_item').forEach((input) => {
        input.style.outline = '1.5px solid #FF0000'
    })
    document.querySelectorAll('.code_input_item')[0].focus()
}

ipcRenderer.on('password-required', () => {
    animateSuccess()
    setTimeout(() => {
        router.push('/login/2fa')
    }, 2000)
})

ipcRenderer.on('loginSuccess', () => {
    animateSuccess()
    setTimeout(() => {
        store.setPhoneNumber('')
        store.setHint('')
        router.push('/home')
    }, 2000)
})

ipcRenderer.on('loginError', (event, message) => {
    animateError()
    console.error('Login error:', message)
    loginError.value = message
    code.value = ['', '', '', '', '']
})

onMounted(() => {
    const animationPath = new URL('@/assets/TGS/DuckTelegame.tgs', import.meta.url).href;
    loadAnimation(tgsContainer, animationPath);
})
</script>

<style scoped>
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
    width: 95%;
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
    text-align: center;
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
    height: 40px;
    gap: 10px;
    margin-top: 10px;
}

.code_input_container input {
    width: 100%;
    height: 100%;
    background-color: rgb(231, 231, 231);
    border-radius: 8px;
    border: 1px solid rgb(182, 182, 182);
    font-size: 20px;
    text-align: center;

}

.code_input_container input:focus {
    outline: 1px solid #409EFF;
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

.login_QR {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    font-size: 14px;
}
</style>