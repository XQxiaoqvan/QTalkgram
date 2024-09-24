<template>
    <div class="home_nav  drag">
        <div class="home_nav_Page_top">
            <h1 @dragstart.prevent class="home_nav_title no_select">QTalk</h1>
            <div class="home_nav_Page">
                <div class="avatar no_drag">
                    <div v-if="photoBase64">
                        <t-avatar @dragstart.prevent style="user-select: none;" size="40px"
                            :image="'data:image/png;base64,' + photoBase64" alt="avatar" />
                    </div>
                    <div v-else>
                        <t-avatar class="avatar-placeholder">Test</t-avatar>
                    </div>
                </div>
                <!-- chats/对话 -->
                <RouterLink to="/home/chats" active-class="active" class="home_nav_Page_chat no_drag">
                    <ChatBubbleIcon />
                </RouterLink>
                <!-- contacts/联系人 -->
                <div to="/home/contacts" active-class="active" class="home_nav_Page_contact no_drag">
                    <MemberIcon />
                </div>
                <!-- calls/通话 -->
                <!-- <div class="home_nav_Page_call">

                </div> -->
                <!-- archives/已归档对话 -->
                <div to="home/archive" active-class="active" class="home_nav_Page_archive no_drag">
                    <archive style="height: 25px;width: 25px;" />
                </div>
            </div>
        </div>
        <div class="home_nav_Page_bottom">
            <div class="nav_bottom_container">
                <!-- wallet/钱包 -->
                <div active-class="active" class="home_nav_Page_wallet no_drag">
                    <WalletIcon />
                </div>
                <!-- Saved Messages/收藏 -->
                <div to="home/saved-messages" active-class="active" class="home_nav_Page_collect no_drag">
                    <BookmarkIcon />
                </div>
                <!-- settings/设置 -->
                <div to="home/settings" active-class="active" class="home_nav_Page_setting no_drag">
                    <SettingIcon />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ChatBubbleIcon, MemberIcon, SettingIcon, BookmarkIcon, WalletIcon } from 'tdesign-icons-vue-next';
import { ref, onMounted } from 'vue';
import archive from '@/assets/icon/archived_pro.vue'

const photoBase64 = ref(null);
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
            font-size: 25px;
            text-decoration: none;

            img {
                width: 25px;
                height: 25px;

            }
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
            font-size: 25px;
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