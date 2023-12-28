<template>
    <div class="procesarFacDiv">
        <botonCerrar @cerrar="cerrar" />
        <div class="divFactura" v-on:mouseenter="focusForm(false)" v-on:mouseleave="focusForm(true)">
            <button class="botonAumentar" @click="zoom(50)">+</button>
            <button class="botonReducir" @click="zoom(-50)">-</button>
            <img style="height: 100%;left: 0%;top: 0%;" class="imgProcesarFac" src="@/assets/iconos/ejemploFac.jpeg">
        </div>
        
        <div class="divFormProcesarFac"></div>
    </div>
</template>
<script>
import botonCerrar from '@/components/comunes/botonCerrar.vue';
export default {
    components: {
        botonCerrar
    },
    props: {
    },
    data() {
        return {
        }
    },
    watch: {
    },
    methods: {
        cerrar(){
            this.$emit('cerrar');
        },
        zoom(valor){
            let img = document.getElementsByClassName('imgProcesarFac')[0];
            let height = parseInt(img.style.height);
            if((height + valor) > 100){
                img.style.height = (height + valor) + '%';
            } else {
                img.style.height = '100%';
            }
        },
        focusForm(focus){
            let form = document.getElementsByClassName('divFormProcesarFac')[0];
            if(focus){
                form.style.opacity = 1;
            } else {
                form.style.opacity = 0.3;
            }
        }
    },
    mounted() {
    },
    created(){
    }
}
</script>

<style scoped>
</style>