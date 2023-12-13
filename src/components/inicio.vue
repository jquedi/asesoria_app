<script setup>
import utilidad from './utilidad.vue'
</script>

<template>
  <header>
    <div id="contenedorUtilidades">
      
      <utilidad class="utilidad" msg="todo_list" />
      <utilidad class="utilidad" msg="calendario" />
      <utilidad class="utilidad" msg="clientes" />
      <utilidad class="utilidad" id="notasDiv" msg="notas" />
      
      <utilidad class="utilidad" msg="archivo" />
    </div>
  </header>
</template>

<style scoped>
</style>
