<template>
    <titleBar state='1' />
    <router-view></router-view>
</template>
<script setup>
import titleBar from '@/components/titleBar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const chatwindow = ref(false)
onMounted(() => {
    ipcRenderer.send('get-state')
    ipcRenderer.send('chatwindow', chatwindow.value)
    chatwindow.value = chatwindow.value
    router.push('/login/QRlogin')
})
ipcRenderer.on('newState', (event, newState) => {
    console.log('Received newState:', newState);
    if (newState._ === 'authorizationStateWaitPhoneNumber') {
        console.log('等待号码');
        router.push('/login/phone')
    } else if (newState._ === 'authorizationStateReady') {
        console.log('登录状态');
        window.location.href = '/home';
    } else if (newState._ === 'authorizationStateWaitOtherDeviceConfirmation') {
        console.log('等待扫码');
        router.push('/login/QRlogin')
    } else if (newState._ === 'authorizationStateWaitPassword') {
        console.log('两部认证');
        router.push('/login/password')
    }
});


</script>
<style scoped></style>