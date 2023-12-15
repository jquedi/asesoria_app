<script setup>
import utilidad from './utilidad.vue'
import clientes from './tools/clientes.vue'
</script>

<template>
  <header>
    <div id="contenedorUtilidades">
      
      <utilidad class="utilidad" msg="todo_list" />
      <utilidad class="utilidad" msg="calendario" />
      <utilidad class="utilidad" msg="clientes" />
      <utilidad class="utilidad" id="notasDiv" msg="notas" />
      
      <utilidad class="utilidad" msg="archivo" />

      <clientes :class="clientesHidden" @cerrar="clientesHidden = 'esconder'" />
    </div>
  </header>
</template>
<script>
export default {
    data() {
        return {
          clientesHidden: 'mostrar',
        }
    },
    watch: {
    },
    methods: {
    },
    mounted() {
    },
    created(){
    }
}
</script>

<style scoped>
</style>
