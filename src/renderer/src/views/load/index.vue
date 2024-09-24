<template>
    <TitleBar state='1' />
    <div class="background">
        <t-loading :loading="loading" text="loading..." class="loading drag" size="50px">
        </t-loading>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import TitleBar from '@/components/TitleBar.vue';
import { useRouter } from 'vue-router';
const router = useRouter();


const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000)
    router.push('/home')
})

</script>
<style scoped>
.loading {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>