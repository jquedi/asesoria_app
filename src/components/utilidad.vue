<script setup>
import todo_list from './utilityBox/todo_list.vue'
import calendario from './utilityBox/calendario.vue'
import clientes from './utilityBox/clientes.vue'
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="utilidad-content">
      <todo_list v-if="msg === 'todo_list'" />
      <calendario v-if="msg === 'calendario'" />
      <clientes v-if="msg === 'clientes'" />
    </div>
  </div>
</template>

<style scoped>
</style>
