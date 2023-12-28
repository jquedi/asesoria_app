<template>
  <header>
    <div id="contenedorUtilidades">
      
      <utilidad class="utilidad" msg="todo_list" />
      <utilidad class="utilidad" msg="calendario" />
      <utilidad class="utilidad" msg="clientes" @click="clientesHidden = 'mostrar'" />
      <utilidad class="utilidad" id="notasDiv" msg="notas"  @click="procesarFacturasHidden = 'mostrar'"/>
      
      <utilidad class="utilidad" msg="archivo" />

      <clientes :classValue="clientesHidden" @cerrar="clientesHidden = 'esconder'" />



      <procesarFacturas v-if="procesarFacturasHidden == 'mostrar'" @cerrar="procesarFacturasHidden = 'esconder'"/>

    </div>
  </header>
</template>
<script>
import utilidad from './utilidad.vue'
import clientes from './tools/clientesTools.vue'
import procesarFacturas from './tools/toolsComponents/clientes/clienteToolsProcesarFactura.vue'
export default {
    components: {
      utilidad,
      clientes,
      procesarFacturas
    },
    props: {
    },
    data() {
        return {
          clientesHidden: 'esconder',
          procesarFacturasHidden: 'mostrar'
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
