<template>
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-show="true"></component>
    </keep-alive>
  </RouterView>
</template>
<script setup>
import { RouterView } from 'vue-router';


</script>
<style scoped></style>