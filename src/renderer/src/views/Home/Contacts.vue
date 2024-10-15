<template>
    <!-- 联系人列表 -->
    <div class="home_content_nav" style="width: 283px;">
        <!-- 拖动栏 -->
        <div class="home_content_drag drag"></div>
        <!-- 搜索框 -->
        <div style="user-select: none;" class="home_content_nav_search">
            <t-input class="home_content_nav_search_input" v-model="search" size="small" placeholder="search" clearable>
                <template #prefix-icon>
                    <SearchIcon />
                </template>
            </t-input>
            <t-button class="home_content_nav_add">+</t-button>
        </div>
        <div class="tags" style="width: 283px;">
            <t-tabs v-model="default_tag" :theme="theme" :scroll-position="center">
                <t-tab-panel :key="1" :label="`联系人`" :value="'1'">
                    <div v-for="i in 7" :key="i" class="list_skeleton">
                        <div class="skeleton">
                            <t-skeleton :rowCol="skeleton_avatar" animation="gradient"></t-skeleton>
                            <t-skeleton class="skeleton_title" :rowCol="[
                                { type: 'text', width: '170px', height: '13px', margin: '0 0 0 6px' },
                                { type: 'text', width: '130px', height: '13px', margin: '0 0 0 5px' },
                            ]" animation="gradient"></t-skeleton>
                        </div>
                    </div>
                </t-tab-panel>
                <t-tab-panel :key="2" :label="`陌生人`" :value="'2'">
                    <div v-for="i in 7" :key="i" class="list_skeleton">
                        <div class="skeleton">
                            <t-skeleton :rowCol="skeleton_avatar" animation="gradient"></t-skeleton>
                            <t-skeleton class="skeleton_title" :rowCol="[
                                { type: 'text', width: '170px', height: '13px', margin: '0 0 0 6px' },
                                { type: 'text', width: '130px', height: '13px', margin: '0 0 0 5px' },
                            ]" animation="gradient"></t-skeleton>
                        </div>
                    </div>
                </t-tab-panel>
            </t-tabs>
        </div>
    </div>
    <div class="home_content_nav_drag" @mousedown="startDrag"></div>
</template>


<script setup>
import { ref } from 'vue';
import { SearchIcon } from 'tdesign-icons-vue-next';

const search = ref('')
const default_tag = ref('1');
const theme = ref('normal');
const skeleton_avatar = [
    [
        { type: 'circle', size: '45px', margin: '0 0 8px 0' },
    ],
]
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

.home_content_drag {
    width: 100%;
    height: 20px;
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

.tags {

    .list_skeleton {
        display: flex;
        padding: 7px;

        .skeleton {
            display: flex;
        }

        .skeleton_title {
            margin: 8px 0 0 0;
        }
    }
}
</style>
