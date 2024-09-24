<template>
    <div style="user-select: none; ">
        <div class="login_container">
            <div class="login_QR">
                <div v-loading="loading"
                    style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
                    <div class="text-center">
                        <div class="qrcode_container" ref="qrCodeRef"></div>
                    </div>
                </div>
            </div>
            <div class=" login_error">
                <span style="user-select: text;">{{ loginError }}</span>
            </div>
            <h1 class="login_Heading Heading">Scan From Mobile Telegram</h1>

        </div>
        <div class="login_tips">
            <ol>
                <li>Open Telegram on your phone</li>
                <li>Go to Settings > Devices > Scan QR</li>
                <li>Scan this image to Log In</li>
            </ol>
        </div>
    </div>
    <div style="user-select: none;" class="login_phone">
        <router-link to="/login/phone" class="span_Link" @click.native="requestPhoneLogin">Or log in using your phone
            number</router-link>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'


const loading = ref(true)
const loginError = ref('')
const qrCodeUrl = ref('')
const logo = ref('')

onMounted(() => {
    loading.value = true
    ipcRenderer.send('request-qr')
})

ipcRenderer.on('login-qr-link', (event, link) => {
    console.log('Received authorization link:', link)
    qrCodeUrl.value = link
    loading.value = false
})

ipcRenderer.on('loginError', (event, error) => {
    console.error('QR Code Error:', error)
    loginError.value = error
})


function requestPhoneLogin() {
    ipcRenderer.send('request-phone-login')
}

//-----------------------------------------------------------------------------------

import QRCodeStyling from 'styled-qr-code';
import { watch } from 'vue';

const qrCodeRef = ref(null);

const props = defineProps({
    data: String,
});


const options = {
    width: 200,
    height: 200,
    type: 'svg',
    data: qrCodeUrl.value,
    qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'H',
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.2,
        margin: 0,
        crossOrigin: 'anonymous',
    },
    dotsOptions: {
        color: '#000000',
        type: 'rounded',
    },
    backgroundOptions: {
        color: '#ffffff',
    },
    cornersSquareOptions: {
        color: '#000000',
        type: 'extra-rounded',
    },
    cornersDotOptions: {
        color: '#000000',
    },
};

const qrCode = new QRCodeStyling(options);

onMounted(async () => {
    qrCode.append(qrCodeRef.value);
});

watch(
    () => props.data,
    (newValue) => {
        qrCode.update({ ...options, data: newValue });
    }
);


</script>
<style scoped>
.login_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
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
    width: 100%;
    padding: 0 2px;
    color: rgb(144, 144, 144);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login_tips ol {
    padding: 0;
    margin: 0 0 0 50px;
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