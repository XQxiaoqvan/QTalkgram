<template>
    <div class="drag_bar drag">
        <div class="drag_icon no_drag" @click="minimizeWindow">
            <RemoveIcon />
        </div>
        <div v-if="state != 1" class="drag_icon no_drag" @click="maximizeWindow">
            <PasteIcon />
        </div>
        <div class="drag_icon_close no_drag" @click="closeWindow">
            <CloseIcon />
        </div>
    </div>
</template>

<script setup>
import { RemoveIcon, CloseIcon, PasteIcon } from 'tdesign-icons-vue-next';
import { windowControls } from '@/utils/TitleBarButton';
import { ref, onMounted, defineProps, toRefs } from 'vue';

const props = defineProps({
    state: String
});

const { state } = toRefs(props);

const minimizeWindow = () => {
    windowControls.minimize();
};

const maximizeWindow = () => {
    windowControls.maximize();

};

const closeWindow = () => {
    windowControls.close();
};
</script>
<style scoped>
.drag_bar {
    /* background-color: rgb(54, 193, 228); */
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

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
</style>