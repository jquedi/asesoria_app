<template>
  <header>
    <div id="contenedorUtilidades">
      
      <utilidad class="utilidad" msg="todo_list" @click="ToDoListHidden = 'mostrar'"/>
      <utilidad class="utilidad" msg="calendario" />
      <utilidad class="utilidad" msg="clientes" @click="clientesHidden = 'mostrar'" />
      <utilidad class="utilidad" id="notasDiv" msg="notas"  @click="procesarFacturasHidden = 'mostrar'"/>
      
      <utilidad class="utilidad" msg="chat" @click="chatHidden = 'mostrar'" />

      <clientes :classValue="clientesHidden" @cerrar="clientesHidden = 'esconder'" />

      <chat :classValue="chatHidden" @cerrar="chatHidden = 'esconder'" />

      <ToDoList :classValue="ToDoListHidden" @cerrar="ToDoListHidden = 'esconder'" />



      <procesarFacturas v-if="procesarFacturasHidden == 'mostrar'" @cerrar="procesarFacturasHidden = 'esconder'"/>

    </div>
  </header>
</template>
<script>
import utilidad from './utilidad.vue'
import clientes from './tools/clientesTools.vue'
import chat from './tools/chatTools.vue'
import ToDoList from './tools/ToDoListTools.vue'
import procesarFacturas from './tools/toolsComponents/clientes/clienteToolsProcesarFactura.vue'
export default {
    components: {
      utilidad,
      clientes,
      procesarFacturas,
      chat,
      ToDoList
    },
    props: {
    },
    data() {
        return {
          clientesHidden: 'esconder',
          procesarFacturasHidden: 'esconder',
          chatHidden: 'esconder',
          ToDoListHidden: 'esconder'
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
