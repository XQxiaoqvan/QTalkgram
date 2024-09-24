<template>
    <!-- 对话列表 -->
    <div class="home_content_nav" :style="{ width: navWidth + 'px' }">
        <!-- 拖动栏 -->
        <div class="home_content_drag drag"></div>
        <!-- 搜索框 -->
        <div style="user-select: none;" class="home_content_nav_search">
            <t-input class="home_content_nav_search_input" v-model="search" size="small" placeholder="搜索" clearable>
                <template #prefix-icon>
                    <SearchIcon />
                </template>
            </t-input>
            <t-button class="home_content_nav_add">+</t-button>
        </div>
        <div>

        </div>
        <div @dragstart.prevent class="home_content_nav_search_line no_select">
            <div v-for="i in 2" :key="i" class="list_skeleton">
                <t-skeleton :rowCol="list_skeleton" animation="gradient"></t-skeleton>
            </div>
            <div class="Chat">
                <!-- 聊天头像 -->
                <t-badge count="0" :offset="[5, 40]">
                    <t-avatar class="avatar">Test</t-avatar>
                </t-badge>
                <!-- 信息 -->
                <div class="info">
                    <div class="title">
                        <div class="name">
                            <!-- 标题 -->
                            <h3 class="name_text">Title Test</h3>
                            <!-- 状态 -->
                            <div v-if="false" ref="tgsContainer" class="tgs-container"></div>
                            <!-- 静音 -->
                            <SoundMute1Icon class="sound" />
                        </div>
                        <div class="separator"></div>
                        <!-- 时间 -->
                        <div class="time">11:08</div>
                    </div>
                    <!-- 不同类型消息判断 -->
                    <div class="message">
                        <!-- 纯文本消息 -->
                        <div class="text">
                            <span>You:&nbsp;</span>Test
                        </div>
                        <!-- 未读 -->
                        <div class="unread">
                            <t-badge class="num" count="1" :offset="[18, 10]" />
                        </div>
                    </div>
                    <div class="grouping" v-if="true">
                        <!-- 分组标签 -->
                        <div class="tag">
                            Test
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="home_content_nav_drag" @mousedown="startDrag"></div>
</template>


<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next';
// import chatlist from '@/components/SessionList/chat.vue'
import { SoundMute1Icon } from 'tdesign-icons-vue-next';

const navWidth = ref(380)
const isDragging = ref(false)
let startX = 0
const chatwindow = ref(true)

const indicatorStyle = ref({})
const groupList = ref(null)
const search = ref('')
const list_skeleton = [
    [
        { type: 'circle', size: '45px' },
        { type: 'rect', margin: '20px 0', height: '30px' },
    ]
]




const updateIndicatorStyle = () => {
    nextTick(() => {
        if (groupList.value) {
            const groupItems = groupList.value.querySelectorAll('.group-item')
            if (groupItems.length > 0) {
                indicatorStyle.value = {
                    width: `${activeItem.offsetWidth}px`,
                    transform: `translateX(${activeItem.offsetLeft}px)`,
                    transition: 'transform 0.3s ease, width 0.3s ease'
                }
            }
        }
    })
}

const startDrag = (event) => {
    isDragging.value = true
    startX = event.clientX - navWidth.value
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event) => {
    if (isDragging.value) {
        let newWidth = event.clientX - startX
        if (newWidth < 280) {
            navWidth.value = 280
        } else if (newWidth > 600) {
            navWidth.value = 600
        } else {
            navWidth.value = newWidth
        }
    }
}

const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}


onMounted(() => {
    window.ipcRenderer.send('chatwindow', chatwindow.value)
    chatwindow.value = !chatwindow.value
    updateIndicatorStyle()
})

</script>


<style scoped>
.home_content_nav_drag {
    width: 0.5px;
    cursor: ew-resize;
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

.home_content_nav {
    height: 100%;
    background-color: #ffffff;
}

.home_content_drag,
.home_content_chat_drag {
    width: 100%;
    height: 20px;
}

.home_content_chat {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}

.home_content_nav_search {
    margin: 0 15px;
    display: flex;
    justify-content: space-between;
    gap: 5px;
}

.home_content_nav_search_input {
    height: 25px;
    background-color: #f1f1f1;
}

.home_content_nav_add {
    height: 25px;
    width: 25px;
    max-width: 25px;
    max-height: 25px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f1f1f1;
    color: #b5b5b5;
    font-size: 20px;
}

.home_content_nav_search_line {
    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
    bottom: 0;
    left: 0;
    padding: 7px;
    overflow: auto;
    /* 添加此行以启用滚动条 */
}

.home_content_nav_search_group {
    max-height: 100px;
    white-space: nowrap;
    overflow-x: auto;
}


.group-list {
    display: flex;
    position: relative;
}

.group-item {
    padding: 5px 15px;
    cursor: pointer;
    transition: color 0.3s ease;
    white-space: nowrap;
    font-size: 15px;
}

.group-item.active {
    color: #409EFF;
}

.group-indicator {
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: #409EFF;
    transition: transform 0.3s ease, width 0.3s ease;
    margin: 0 5px;
}

.list_skeleton {
    display: flex;
    margin-bottom: 10px;

    .list_skeleton_text {
        width: 70%;
    }
}

.Chat {
    display: flex;
    padding: 7px;
    width: 100%;
    box-sizing: border-box;
    gap: 5px;
    height: 67px;



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
</style>