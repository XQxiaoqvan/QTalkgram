<template>
    <!-- 对话列表 -->
    <div class="home_content_nav" style="width: 300px;">
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
        <div style="padding: 7px;display: flex; gap: 15px;">
            <t-skeleton v-for="i in 5" :rowCol="[
                { type: 'text', width: '40px', height: '18px', margin: '0 0 0 0' },
            ]" animation="gradient">
            </t-skeleton>
        </div>
        <div>
            <div @dragstart.prevent class="home_content_nav_search_line no_select">
                <div v-for="i in 7" :key="i" class="list_skeleton">
                    <div class="skeleton">
                        <t-skeleton :rowCol="skeleton_avatar" animation="gradient"></t-skeleton>
                        <t-skeleton class="skeleton_title" :rowCol="[
                            { type: 'text', width: '170px', height: '13px', margin: '0 0 0 5px' },
                            { type: 'text', width: '130px', height: '13px', margin: '0 0 0 5px' },
                            { type: 'text', width: '100px', height: '13px', margin: '0 0 0 5px' },
                        ]" animation="gradient"></t-skeleton>
                        <t-skeleton class="skeleton_title" :rowCol="[
                            { type: 'text', width: '30px', height: '13px', margin: '0 0 0 5px' },
                            { type: 'circle', size: '19px', margin: '10px 0 0 15px' },
                        ]" animation="gradient"></t-skeleton>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div @dragstart.prevent class="home_content_nav_search_line no_select">
            <div v-for="i in 6" :key="i" class="list_skeleton">
                <div class="skeleton">
                    <t-skeleton :rowCol="skeleton_avatar" animation="gradient"></t-skeleton>
                    <t-skeleton class="skeleton_title" :rowCol="[
                        { type: 'text', width: '140px', height: '13px', margin: '0 0 0 5px' },
                        { type: 'text', width: '130px', height: '13px', margin: '0 0 0 5px' },
                        { type: 'text', width: '100px', height: '13px', margin: '0 0 0 5px' },
                    ]" animation="gradient"></t-skeleton>
                    <t-skeleton class="skeleton_title" :rowCol="[
                        { type: 'text', width: '30px', height: '13px', margin: '0 0 0 5px' },
                        { type: 'circle', size: '19px', margin: '10px 0 0 15px' },
                    ]" animation="gradient"></t-skeleton>
                </div>
            </div>
        </div> -->
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next';
import { defineProps, defineEmits } from 'vue';

const props = defineProps();
const emit = defineEmits();

const search = ref('')
const skeleton_avatar = [
    [
        { type: 'circle', size: '45px', margin: '0 0 8px 0' },
    ],
]
</script>


<style scoped>
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
    padding: 7px;

    .skeleton {
        display: flex;
    }

    .skeleton_title {
        margin: 0;
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
<style>
.t-skeleton__row {
    margin-bottom: 4px;
}

.t-tabs__operations--left {
    display: none;
}

.t-tabs__operations--right {
    display: none;
}
</style>