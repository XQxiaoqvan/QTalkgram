<template>
    <div class="home">
        <appbar />
        <div class="home_content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Appbar from './Home/appbar.vue'

</script>

<style scoped>
.home {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
}

.home_content {
    display: flex;
    width: 100%;
    height: 100%;
}
</style>