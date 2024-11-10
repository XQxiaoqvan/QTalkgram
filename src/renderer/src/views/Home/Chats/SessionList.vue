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
        <div @dragstart.prevent class="home_content_nav_search_line no_select">
            <chatlist />
        </div>
    </div>
    <div class="home_content_nav_drag" @mousedown="startDrag"></div>
</template>
s

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next';
import chatlist from '@/components/SessionList/chat.vue'

const navWidth = ref(280)
const isDragging = ref(false)
let startX = 0
const chatwindow = ref(true)

const indicatorStyle = ref({})
const groupList = ref(null)
const search = ref('')




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
        if (newWidth < 180) {
            navWidth.value = 180
        } else if (newWidth > 450) {
            navWidth.value = 450
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
</style>