<template>
    <div class="home_content_nav_drag" @mousedown="startDrag"></div>
</template>

<script setup>
import { ref, onMounted, nextTick, defineProps, defineEmits } from 'vue'

const props = defineProps({
    navWidth: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['update:navWidth'])

const isDragging = ref(false)
let startX = 0

const startDrag = (event) => {
    isDragging.value = true
    startX = event.clientX - props.navWidth
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
}

const onDrag = (event) => {
    if (isDragging.value) {
        let newWidth = event.clientX - startX
        if (newWidth < 180) {
            emit('update:navWidth', 280)
        } else if (newWidth > 600) {
            emit('update:navWidth', 600)
        } else {
            emit('update:navWidth', newWidth)
        }
    }
}

const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}

onMounted(() => {
    // 其他初始化代码
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
</style>