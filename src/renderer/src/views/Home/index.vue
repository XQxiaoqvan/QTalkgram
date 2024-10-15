<template>
    <div class="home column">
        <Appbar />
        <div class="split-container">
            <router-view />
            <div class="home_content_nav_drag" @mousedown="startDrag"></div>
            <div class="home_right column-right">
                <div>

                </div>
                <titleBar />
            </div>
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
});

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

.split-container {
    display: flex;
    height: 100%;
    width: 100%;
}


.home_right {
    height: 100%;
    width: 100%;
}

.home_content_nav_drag {
    width: 0.5px;
    /* cursor: ew-resize; */
    background-color: #ccc;
    position: relative;
    z-index: 9999;
}

.home_content_nav_drag::before {
    content: '';
    position: absolute;
    z-index: 9999;
    top: 0;
    left: -5px;
    right: -5px;
    bottom: 0;

}
</style>