<script setup>
import menuNav from './components/menuNav.vue'
import login from './components/login.vue'
</script>

<template>
  
  <!-- <login/> -->

  <menuNav id="menuNav" class="fixed w-90% h-90% bg-blue-400 z-20" />
  
  <RouterView />
  
</template>

<style scoped>
</style>
