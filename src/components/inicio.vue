<template>
  <header>
    <div id="contenedorUtilidades">
      
      <utilidad class="utilidad" msg="todo_list" />
      <utilidad class="utilidad" msg="calendario" />
      <utilidad class="utilidad" msg="clientes" @click="clientesHidden = 'mostrar'" />
      <utilidad class="utilidad" id="notasDiv" msg="notas" />
      
      <utilidad class="utilidad" msg="archivo" />

      <clientes :classValue="clientesHidden" @cerrar="clientesHidden = 'esconder'" />
    </div>
  </header>
</template>
<script>
import utilidad from './utilidad.vue'
import clientes from './tools/clientesTools.vue'
export default {
    components: {
      utilidad,
      clientes
    },
    props: {
    },
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
