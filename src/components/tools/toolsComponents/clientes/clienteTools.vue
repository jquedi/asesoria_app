<template>
    <div class="clienteTool">
        <notificacionAlerta style="top:2px; left:10px;" v-if="contSinProcesar > 0" :valor="contSinProcesar" />
        
        <img class="imagenClienteTool" src="@/assets/iconos/boy.jpg" alt="">
        <div class="datosClienteTool">
            <div class="datosClienteToolSub">
                <div class="datosClienteToolSub2">{{cliente.nombre}}, {{cliente.apellido}}</div>
                <div class="datosClienteToolSub3">{{cliente.nif}}</div>
            </div>
            <div class="datosClienteToolSub">
                <div class="datosClienteToolSub2">{{cliente.telefono}}</div>
                <div class="datosClienteToolSub3">{{cliente.email}}</div>
            </div>
            
            <div class="datosClienteToolSub">
                <div class="datosClienteToolSub2">{{cliente.tipo}}</div>
                <div class="datosClienteToolSub2">{{cliente.CNAE}}</div>
                <div class="datosClienteToolSub3">{{cliente.IAE}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import notificacionAlerta from '@/components/comunes/notificacionAlerta.vue';
export default {
    components: {
        notificacionAlerta
    },
    props: {
        cliente: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            contSinProcesar: this.cliente.contSinProcesar
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