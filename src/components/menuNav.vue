<script setup>
import resumenIcon from './icons/inicioIcon.vue'
import estadisticasIcon from './icons/estadisticasIcon.vue'
import facturarIcon from './icons/facturarIcon.vue'
import ajustesIcon from './icons/ajustesIcon.vue'

import { auth } from '/workspaces/asesoria_app/src/firebase.js';
</script>

<template>
    <div class="navigation">
        <ul>
            <li @click="activo = 'resumen'" id="resumen" class="list active">
                <RouterLink  to="/">
                    <span class="icon"><resumenIcon class="menuNavIcon" /></span>
                    <span class="text">Inicio</span>
                </RouterLink>
            </li>
            <li @click="activo = 'facturar'" id="facturar" class="list">
                <RouterLink  to="/facturar">
                    <span class="icon"><facturarIcon class="menuNavIcon" /></span>
                    <span class="text">Asistente</span>
                </RouterLink>
            </li>
            <li @click="activo = 'estadisticas'" id="estadisticas" class="list">
                <RouterLink  to="/estadisticas">
                    <span class="icon"><estadisticasIcon class="menuNavIcon" /></span>
                    <span class="text">Estadisticas</span>
                </RouterLink>
            </li>
            <li @click="activo = 'ajustes'" id="ajustes" class="list">
                <RouterLink  to="/ajustes">
                    <span class="icon"><ajustesIcon class="menuNavIcon" /></span>
                    <span class="text">Ajustes</span>
                </RouterLink>
            </li>
            <div id="indicador" class="indicator"></div>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activo: "resumen",
        }
    },
    watch: {
        activo: function(val){
            this.activar(val)
        }
    },
    methods: {
        
        cerrarSesion() {
            localStorage.removeItem('token');
            // Cerrar sesión en Firebase
            auth.signOut();
        },
        activar(val){
            var doc = document.getElementById(val);
            var indicador = document.getElementById("indicador");
            var doc1 = document.getElementById("resumen");
            var doc2 = document.getElementById("facturar");
            var doc3 = document.getElementById("estadisticas");
            var doc4 = document.getElementById("ajustes");
            doc1.classList.remove("active");
            doc2.classList.remove("active");
            doc3.classList.remove("active");
            doc4.classList.remove("active");

            doc.classList.add("active");


            if(val == "facturar"){
                document.getElementById("indicador").style.left = "calc(37.5% - 35px)";
            }else{
                if(val == "estadisticas"){
                    indicador.style.left = "calc(62.5% - 35px)";
                }else{
                    if(val == "ajustes"){
                        indicador.style.left = "calc(87.5% - 35px)";
                        this.cerrarSesion();
                    }else{
                        indicador.style.left = "calc(12.5% - 35px)";
                    }
                }
            }


        }
    },
    mounted() {
        this.$router.push({ path: '/', replace: true })
        this.activar("resumen")
    },
    created(){
    }
}
</script>
<style scoped>
</style>
