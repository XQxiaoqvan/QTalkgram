<template>
    <div class="home_nav  drag">
        <div class="home_nav_Page_top">
            <h1 @dragstart.prevent class="home_nav_title no_select">Gramix</h1>
            <div class="home_nav_Page">
                <div class="avatar no_drag">
                    <div v-if="photoBase64">
                        <t-avatar @dragstart.prevent style="user-select: none;" size="40px"
                            :image="'data:image/png;base64,' + photoBase64" alt="avatar" />
                    </div>
                    <div v-else>
                        <div style="user-select: none;" class="avatar-placeholder">{{ displayName }}</div>
                    </div>
                </div>
                <!-- chats -->
                <RouterLink to="/home/chats" active-class="active" class="home_nav_Page_chat no_drag">
                    <div ref="tgsChat" class="tgs-container" style="filter: brightness(0);"></div>
                </RouterLink>
                <!-- contacts -->
                <div to="/home/contacts" active-class="active" class="home_nav_Page_contact no_drag">
                    <div ref="tgsContact" class="tgs-container" style="filter: brightness(0);"></div>
                </div>
                <!-- calls -->
                <!-- <div class="home_nav_Page_call">

                </div> -->
                <!-- archives -->
                <div to="home/archive" active-class="active" class="home_nav_Page_archive no_drag">
                    <div ref="tgsArchive" class="tgs-container" style="filter: brightness(0);"></div>
                </div>
            </div>
        </div>
        <div class="home_nav_Page_bottom">
            <div class="nav_bottom_container">
                <!-- wallet -->
                <div to="home/wallet" active-class="active" class="home_nav_Page_wallet no_drag">
                    <div ref="tgsWallet" class="tgs-container" style="filter: brightness(0);"></div>
                </div>
                <!-- Saved Messages -->
                <div to="home/saved-messages" active-class="active" class="home_nav_Page_collect no_drag">
                    <div ref="tgsSavedMessages" class="tgs-container" style="filter: brightness(0);"></div>
                </div>
                <!-- settings -->
                <div to="home/settings" active-class="active" class="home_nav_Page_setting no_drag">
                    <div ref="tgsSetting" class="tgs-container" style="filter: brightness(0);"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { RouterLink } from 'vue-router';
import { loadAnimation } from '@/utils/lottieTGS.js'

const tgsChat = ref(null)
const tgsSetting = ref(null)
const tgsArchive = ref(null)
const tgsContact = ref(null)
const tgsWallet = ref(null)
const tgsSavedMessages = ref(null)
const photoBase64 = ref(null);
const displayName = ref('');

onBeforeMount(() => {
    const animationChat = new URL('@/assets/TGS/Chats.tgs', import.meta.url).href;
    loadAnimation(tgsChat, animationChat);
    const animationSetting = new URL('@/assets/TGS/Setting.tgs', import.meta.url).href;
    loadAnimation(tgsSetting, animationSetting);
    const animationArchive = new URL('@/assets/TGS/ArchivedChats.tgs', import.meta.url).href;
    loadAnimation(tgsArchive, animationArchive);
    const animationContact = new URL('@/assets/TGS/Contacts.tgs', import.meta.url).href;
    loadAnimation(tgsContact, animationContact);
    const animationWallet = new URL('@/assets/TGS/wallet.tgs', import.meta.url).href;
    loadAnimation(tgsWallet, animationWallet);
    const animationSavedMessages = new URL('@/assets/TGS/SavedMessages.tgs', import.meta.url).href;
    loadAnimation(tgsSavedMessages, animationSavedMessages);
});

onMounted(() => {
    ipcRenderer.send('get-user-avatar');
});

ipcRenderer.on('user-avatar', (event, { photoBase64: base64, displayName: name }) => {
    photoBase64.value = base64;
    displayName.value = name;
});
</script>

<style scoped>
.home {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}

.home_nav_title {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    margin-top: 10px;
}


.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
}

.home_nav {
    padding-left: 2px;

    .home_nav_Page {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;

        .avatar img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
        }

        .tgs-container {
            width: 35px;
            height: 35px;
        }

        .home_nav_Page_chat,
        .home_nav_Page_contact,
        .home_nav_Page_archive,
        .home_nav_Page_call {
            width: 40px;
            height: 40px;
            /* background-color: #d1d1d1; */
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .home_nav_Page_chat:hover,
        .home_nav_Page_contact:hover,
        .home_nav_Page_archive:hover,
        .home_nav_Page_call:hover {
            background-color: #d1d1d1;
        }
    }
}

.home_nav_Page_bottom {
    .nav_bottom_container {
        margin-bottom: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;



        .home_nav_Page_setting,
        .home_nav_Page_collect,
        .home_nav_Page_wallet {
            width: 40px;
            height: 40px;
            /* background-color: #d1d1d1; */
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

        }

        .home_nav_Page_setting:hover,
        .home_nav_Page_collect:hover,
        .home_nav_Page_wallet:hover {
            background-color: #d1d1d1;
        }

        .tgs-container {
            width: 35px;
            height: 35px;
        }
    }
}



.home_nav {
    width: 60px;
    max-width: 60px;
    min-width: 60px;
    height: 100%;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
}

.active {
    background-color: #dadada;
}
</style>