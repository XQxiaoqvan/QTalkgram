<template>
    <!-- 聊天窗口 -->
    <div class="chat">
        <!-- 拖动栏 -->
        <div class="chat_drag drag" :style="{ backgroundColor: !store.setChatInfo.id ? '' : '#ffffff' }">
            <div class="drag_icon no_drag" @click="minimizeWindow">
                <RemoveIcon />
            </div>
            <div class="drag_icon no_drag" @click="maximizeWindow">
                <PasteIcon />
            </div>
            <div class="drag_icon_close no_drag" @click="closeWindow">
                <CloseIcon />
            </div>
        </div>
        <!-- 信息窗口 -->
        <div v-if="store.setChatInfo.id" @dragstart.prevent class="chat_info" style="user-select: none;">
            <div class="chat_info_left">
                <div class="chat_info_left_img">
                    <t-avatar @dragstart.prevent size="40px" :image="'/@fs/' + store.setChatInfo.photoPath" alt="头像" />
                </div>
                <div>
                    <h3>{{ store.setChatInfo.title }}</h3>
                    <p>null</p>
                </div>
            </div>
            <div class="chat_info_right">
                <!-- 顶置栏 -->
                <div class="chat_top">
                </div>
                <div>
                    <SearchIcon />
                </div>
                <div>
                    <EllipsisIcon />
                </div>
            </div>
        </div>
        <t-divider v-if="store.setChatInfo.id" style="margin:0;" />
        <!-- 翻译 -->
        <div v-if="false" class="translate">
            <div class="chat_translate">
                <Translate1Icon class="chat_translate_text" />
                <p class="chat_translate_text">翻译为英语</p>
            </div>
        </div>
        <t-divider v-if="false" style="margin:0;" />
        <!-- 聊天窗口 -->
        <div v-if="store.setChatInfo.id" class="chat_chat">
            <div class="each_message">
                <div v-for="(message, index) in messages.slice().reverse()" :key="index">
                    <div class="message_left">
                        <avatarMessage
                            v-if="store.setChatInfo.type._ === 'chatTypeSupergroup' && userCache[message.sender_id.user_id]"
                            :user="userCache[message.sender_id.user_id]" />
                        <chatmessage v-if="userCache[message.sender_id.user_id]"
                            :user="userCache[message.sender_id.user_id]" :user_id="message.sender_id.user_id"
                            :timedata="message.date" :text="message.content?.text?.text || '其他消息'" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 输入框 -->
        <chatinput v-if="store.setChatInfo.id" />

    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import chatinput from '@/components/chats/input/input.vue';
import chatmessage from '@/components/chats/Message/txtMessage.vue';
import avatarMessage from '@/components/chats/Message/avatarMessage.vue';
import { windowControls } from '@/utils/WindowsButton';
import { RemoveIcon, PasteIcon, CloseIcon, Translate1Icon, SearchIcon, EllipsisIcon } from 'tdesign-icons-vue-next';
import { useStore } from '@/store/store';

const store = useStore();
const messages = ref([]);
const userCache = ref({});

watch(() => store.setChatInfo.id, (newChatId) => {
    if (newChatId) {
        ipcRenderer.send('get-Message', newChatId);
        console.log("Chatid的值为", newChatId);
        messages.value = [];
    }
});

ipcRenderer.on('lastMessage', (event, message) => {
    messages.value = [];
    console.log(message.messages);
    messages.value = message.messages;
    // 获取每条消息的用户信息
    message.messages.forEach(async (msg) => {
        if (!userCache.value[msg.sender_id.user_id]) {
            userCache.value[msg.sender_id.user_id] = await getUserInfo(msg.sender_id.user_id);
        }
    });
});

const getUserInfo = async (userId) => {
    if (!userCache.value[userId]) {
        try {
            userCache.value[userId] = await ipcRenderer.invoke('get-user', userId);
        } catch (error) {
            console.error("获取用户信息失败:", error);
        }
    }
    return userCache.value[userId];
};

// 按钮点击事件
const minimizeWindow = () => {
    windowControls.minimize(); // 最小化窗口
};

const maximizeWindow = () => {
    windowControls.maximize(); // 最大化窗口

};

const closeWindow = () => {
    windowControls.close(); // 关闭窗口
};

</script>
<style scoped>
.chat {
    background-color: rgb(245, 245, 245);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

}

.chat_drag {
    /* background-color: rgb(0, 204, 255); */
    width: 100%;
    height: 25px;
    min-height: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* background-color: #ffffff; */

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

.chat_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 45px;
    height: 45px;
    box-sizing: border-box;
    padding: 5px 10px;
    background-color: #ffffff;


    .chat_info_left {
        display: flex;
        align-items: center;
        gap: 10px;

        h3,
        p {
            margin: 0;
        }

        h3 {
            font-weight: 600;
            font-size: 15px;
        }

        p {
            font-size: 12px;
            color: #666;
        }
    }

    .chat_info_right {
        display: flex;
        align-items: center;
        gap: 20px;
    }
}

.chat_info:hover {
    background-color: #ffffff;
}

.translate {

    background-color: #ffffff;

    .chat_translate {
        display: flex;
        justify-content: center;
        padding: 5px 0;
        align-items: center;
        gap: 5px;


        .chat_translate_text {
            margin: 0;
            font-size: 15px;
            color: rgb(0, 140, 255);
        }
    }

    .chat_translate:hover {
        background-color: #dcdcdc;
    }
}

.chat_chat {
    display: flex;
    flex-direction: column;
    max-height: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 5px 0;
}

::-webkit-scrollbar {
    width: 10px;
    background-color: #00000000;
}

::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    transition: background-color 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #888;
    transition: background-color 0.2s ease;
}

::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #00000000;
}


.message_left {
    display: flex;
    align-items: flex-end;
    gap: 10px;
}


.each_message {
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    gap: 5px;
}


.my_message {
    display: flex;
    justify-content: flex-end;
}
</style>