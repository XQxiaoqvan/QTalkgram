<template>
    <div class="home">
        <Appbar />
        <router-view />
        <div class="home_left">
            <titleBar />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Appbar from '@/components/appbar.vue'
import titleBar from '../../components/titleBar.vue';
import { useRouter } from 'vue-router';

const chatwindow = ref(true)
const router = useRouter();

onMounted(() => {
    window.ipcRenderer.send('chatwindow', chatwindow.value)
    chatwindow.value = !chatwindow.value
    // ipcRenderer.send('get-state')
})
ipcRenderer.on('newState', (event, newState) => {
    console.log('Received newState:', newState);
    if (newState._ === 'authorizationStateWaitPhoneNumber') {
        console.log('等待号码');
        router.push('/login/phone')
    } else if (newState._ === 'authorizationStateReady') {
        console.log('登录状态');
        router.push('/home/chats')
    } else if (newState._ === 'authorizationStateWaitOtherDeviceConfirmation') {
        console.log('等待扫码');
        router.push('/login/QRlogin')
    } else if (newState._ === 'authorizationStateWaitPassword') {
        console.log('两部认证');
        router.push('/login/password')
    }
});


</script>
<style scoped>
.home {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}

.home_right {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: black;
}

.home_left {
    /* background-color: aqua; */
    width: 100%;
}
</style>