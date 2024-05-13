<template>
  <div>
    <div class="utilidad-content">
      <todo_list v-if="msg === 'todo_list'" />
      <calendario v-if="msg === 'calendario'" />
      <clientes v-if="msg === 'clientes'" />
      <notas v-if="msg === 'notas'" />
      <chat v-if="msg === 'chat'" />
    </div>
  </div>
</template>
<script>
import todo_list from './utilityBox/todo_list.vue'
import calendario from './utilityBox/calendario.vue'
import clientes from './utilityBox/clientes.vue'
import notas from './utilityBox/notas.vue'
import chat from './utilityBox/chat.vue'
export default {
    components: {
        todo_list,
        calendario,
        clientes,
        notas,
        chat
    },
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    data() {
        return {
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
