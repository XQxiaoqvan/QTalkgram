<template>
    <div class="SessionList">
        <!-- 遍历聊天列表 -->
        <button v-for="session in sessions" :key="session.id" class="Chat"
            @click="setChatinfo(session.id, session.title, session.photo.big.local.path, session.type)">
            <!-- 聊天头像 -->
            <t-badge count="0" :offset="[5, 40]">
                <!-- 检查 session.photo 和 session.photo.minithumbnail 是否存在 -->
                <t-avatar v-if="!session.photo || !session.photo.minithumbnail || !session.photo.minithumbnail.data"
                    class="avatar">{{
                        session.title.slice(0, 2).toUpperCase() }}</t-avatar>
                <img v-else-if="session.photo.big.local.path && session.photo.big.local.path.trim() !== ''"
                    :src="'/@fs/' + session.photo.big.local.path" alt="img" class="avatar"
                    style="border-radius: 50%;"></img>
                <img v-else :src="'data:image/jpeg;base64,' + session.photo.minithumbnail.data" alt="img" class="avatar"
                    style="border-radius: 50%;">
            </t-badge>
            <!-- 信息 -->
            <div class="info">
                <div class="title">
                    <div class="name">
                        <!-- 标题 -->
                        <h3 class="name_text">{{ session.title }}</h3>
                        <!-- 状态 -->
                        <div v-if="false" ref="tgsContainer" class="tgs-container"></div>
                        <!-- 静音 -->
                        <SoundMute1Icon v-if="!session.notification_settings.use_default_mute_for" class="sound" />
                    </div>
                    <div class="separator"></div>
                    <!-- 时间 -->
                    <div class="time">{{ formatTime(session.last_message?.date) }}</div>
                </div>
                <!-- 不同类型消息判断 -->
                <div class="message">
                    <!-- 纯文本消息 -->
                    <div v-if="session.last_message?.content._ === 'messageText'" class="text">
                        <span></span>{{ session.last_message.content.text.text
                        }}
                    </div>
                    <!-- 附带图片消息 -->
                    <div v-else-if="session.last_message?.content._ === 'messagePhoto'" class="text">
                        <img :src="'data:image/jpeg;base64,' + session.last_message.content.photo.minithumbnail.data"
                            alt="img" style="width: 15px; height: 15px; border-radius: 3px;">&nbsp;Photo
                    </div>
                    <!-- 其他 -->
                    <div v-else class="text">其他消息类型</div>
                    <!-- 未读 -->
                    <div class="unread">
                        <t-badge class="num" :count="session.unread_count" :offset="[18, 10]" />
                    </div>
                </div>
                <div class="grouping" v-if="false">
                    <!-- 分组标签 -->
                    <div class="tag">
                        Test
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { SoundMute1Icon } from 'tdesign-icons-vue-next';
import { useStore } from '@/store/store'



const store = useStore()
const sessions = ref([])


onMounted(() => {
    ipcRenderer.send('get-chats')
})
const formatTime = (timestamp) => {
    if (!timestamp) return ''; // 检查 timestamp 是否存在
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isThisWeek = (now - date) / (1000 * 60 * 60 * 24) < 7;

    if (isToday) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (isThisWeek) {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return days[date.getDay()];
    } else {
        return date.toLocaleDateString();
    }
}

ipcRenderer.on('update-chats', (event, chatDetails) => {
    console.log(chatDetails)
    sessions.value = chatDetails
})


const setChatinfo = (id, title, photoPath, type) => {
    store.setChatInfo = { id, title, photoPath, type }
    console.log(store.setChatInfo);

}
</script>
<style scoped>
.SessionList {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;

    .Chat {
        display: flex;
        padding: 7px;
        width: 100%;
        box-sizing: border-box;
        gap: 5px;
        height: 67px;
        background: none;
        border: none;
        font: inherit;
        color: inherit;
        cursor: pointer;
        outline: inherit;




        .avatar {
            width: 45px;
            height: 45px;
        }

        .info {
            width: 100%;
            display: flex;
            box-sizing: border-box;
            flex-direction: column;
            justify-content: flex-start;
            flex-grow: 1;
            overflow: hidden;


            .title {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;



                .name {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    overflow: hidden;

                    .name_text {
                        font-size: 14px;
                        font-weight: 500;
                        flex-grow: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin: 0;
                    }

                    .tgs-container {
                        width: 20px;
                        height: 20px;
                        flex-shrink: 0;
                    }

                    .sound {
                        font-size: 14px;
                        color: #999;
                        flex-shrink: 0;
                    }
                }



                .separator {
                    flex-grow: 1;
                    min-width: .5rem;
                }

                .time {
                    color: #999;
                    font-size: 12px;
                    flex-shrink: 0;
                    margin-left: 10px;
                    align-self: flex-start;
                    text-align: right;
                    display: flex;
                }
            }

            .message {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .text {
                    font-size: 13px;
                    color: #999;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: calc(100% - 40px);
                    display: flex;
                    align-items: center;
                }

                .unread {
                    display: flex;
                    gap: 5px;
                    flex-shrink: 0;
                    width: 30px;
                    justify-content: flex-end;

                    .num {
                        width: 30px;
                        text-align: right;
                    }
                }
            }

            .grouping {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;

                .tag {
                    font-size: 11px;
                    color: #6560f6;
                    background-color: #cfceec;
                    padding: 1px 3px;
                    border-radius: 5px;
                    width: auto;
                }
            }
        }
    }

    .Chat:hover {
        background-color: rgb(51, 144, 236);
        width: 100%;
        color: #fff;
        box-sizing: border-box;
        border-radius: 10px;

        .time {
            color: #fff !important;
        }

        .text {
            color: #fff !important;
        }
    }
}
</style>