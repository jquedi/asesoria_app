<template>
    <div class="procesarFacDiv">
        <botonCerrar @cerrar="cerrar" />
        <div class="divFactura" v-on:mouseenter="focusForm(false)" v-on:mouseleave="focusForm(true)">
            <button class="botonAumentar" @click="zoom(50)">+</button>
            <button class="botonReducir" @click="zoom(-50)">-</button>
            <img style="height: 100%;left: 0%;top: 0%;" class="imgProcesarFac" src="@/assets/iconos/ejemploFac.jpeg">
        </div>
        
        <div class="divFormProcesarFac">
            <div class="procesarFacDatos">
                <div class="titulo">DATOS DEL CLIENTE</div>
                <div class="campo">
                    <div class="tituloCampo">Nombre:</div>
                    <input style="width: 200px;" class="inputCampo" type="text" v-model="datosFac.cliente.nombre">
                    <div class="tituloCampo">Actividad:</div>
                    <select style="width: 165px;" class="inputCampo" name="" id="" v-model="datosFac.cliente.actividad">
                        <option style="color: black;" value=""></option>
                        <option style="color: black;" v-for="actividad in actividades" :value="actividad.descripcion">
                            {{ actividad.iae }} | {{ actividad.descripcion }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="procesarFacDatos">
                <div class="titulo">DATOS DEL PROVEEDOR</div>
                <div class="campo">
                    <div class="tituloCampo">Buscador:</div>
                    <input style="width: 200px;" class="inputCampo" type="text">
                    <div class="tituloCampo">Nombre:</div>
                    <input style="width: 200px;" class="inputCampo" type="text" v-model="datosFac.proveedor.nombre">
                </div>
                <div class="campo">
                    <div class="tituloCampo">NIF:</div>
                    <input style="width: 110px;" class="inputCampo" type="text" v-model="datosFac.proveedor.nif">
                    <div class="tituloCampo">C.P.:</div>
                    <input style="width: 75px;" class="inputCampo" type="text" v-model="datosFac.proveedor.cp">
                </div>
            </div>
            <div class="procesarFacDatos">
                <div class="titulo">DATOS DE LA FACTURA</div>
                <div class="campo">
                    <div class="tituloCampo">Tipo:</div>
                    <select style="width: 225px;" class="inputCampo" name="" id="" v-model="datosFac.factura.tipo">
                        <option style="color: black;" value=0></option>
                        <option style="color: black;" v-for="(texto, clave) in tipos" :value="clave">
                            {{ texto }}
                        </option>
                    </select>
                    <div class="tituloCampo">Especial:</div>
                    <select style="width: 165px;" class="inputCampo" name="" id="" v-model="datosFac.factura.especial" @change="cambioEspecial(datosFac.factura.especial)">
                        <option style="color: black;" value=0></option>
                        <option style="color: black;" v-for="(texto, clave) in especial" :value="clave">
                            {{ texto }}
                        </option>
                    </select>
                </div>
                <div class="campo">
                    <div class="tituloCampo">Numero:</div>
                    <input style="width: 200px;" class="inputCampo" type="text" v-model="datosFac.factura.numero">
                    <div class="tituloCampo">Fecha:</div>
                    <input style="width: 100px;" class="inputCampo" type="date" v-model="datosFac.factura.fecha">
                    <div class="tituloCampo">R.E. </div>
                    <input class="inputCampo" type="checkbox" v-model="datosFac.factura.re" @click="sincronicarRE()">
                </div>
                <div class="campoCompuesto">
                    <div class="titulosubCampo">BASES IMPONIBLES</div>
                    <div class="subcamposDiv">
                        <div v-for="base in datosFac.factura.bases" class="subcampo">
                            <div class="campo">
                                <div class="tituloCampo">{{ base.porcentaje }}%:</div>
                                <input style="width: 70px;" class="inputCampo" type="number" v-model="base.valor" @change="calcularTotal()">
                            </div>
                            <div class="campo">
                                <div class="tituloCampo">IVA: </div>
                                <input style="width: 70px;" class="inputCampo" type="number" :value="base.valor*((base.porcentaje/100)+1)" @change="calcularTotal()">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="campoCompuesto">
                    <div class="titulosubCampo">Retencion</div>
                    <div class="subcamposDiv">
                        <div class="campo">
                            <div class="tituloCampo">Tipo:</div>
                            <select style="width: 150px;" class="inputCampo" name="" id="" v-model="retencion">
                                <option style="color: black;" value=0></option>
                                <option style="color: black;" v-for="(retencion, clave) in retenciones" :value="clave">
                                    {{ retencion[0] }}
                                </option>
                            </select>
                            <div class="tituloCampo">Porcentaje:</div>
                            <input style="width: 30px;" class="inputCampo" type="number" v-model="datosFac.factura.retencion.porcentaje" @change="calcularTotal()">
                            <div class="total">TOTAL:</div>
                            <div class="totalCant">{{datosFac.factura.total}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from '/workspaces/asesoria_app/src/firebase.js';
import { doc, getDoc } from "firebase/firestore";
import botonCerrar from '@/components/comunes/botonCerrar.vue';
export default {
    components: {
        botonCerrar
    },
    props: {
    },
    data() {
        return {
            retenciones: [
                { tipo: 'Alquileres', valor: 19 },
                { tipo: 'Profesionales', valor: 15 },
            ],
            retencion: 0,
            actividades: [
                { descripcion: 'Jardinero', iae: "08556" },
                { descripcion: 'Cocinero', iae: "08542" },
            ],
            tipos: [ 'Factura', 'Recibo', 'Abono'],
            especial: [ 'Exenta', 'Inversión del sujeto pasivo', 'Exportación'],
            datosFac: {
                cliente: {
                    nombre: '',
                    actividad: ''
                },
                proveedor: {
                    nombre: '',
                    nif: '',
                    cp: ''
                },
                factura: {
                    tipo: '',
                    especial: '',
                    numero: '',
                    fecha: '',
                    re: false,
                    bases: [
                        { porcentaje: 21, valor: 0, rePor: 5.2 },
                        { porcentaje: 10, valor: 0, rePor: 1.4 },
                        { porcentaje: 4, valor: 0, rePor: 0.5 },
                        { porcentaje: 0, valor: 0, rePor: 0 },
                        { porcentaje: 5, valor: 0, rePor: 0.62 }
                    ],
                    retencion: {
                        porcentaje: 0
                    },
                    total: 0
                }
            }
        }
    },
    watch: {
        'retencion': {
            handler: function (val) {
                if(val == 0){
                    this.datosFac.factura.retencion.porcentaje = 0;
                }else{
                    this.datosFac.factura.retencion.porcentaje = this.retenciones[val][1];
                }
                this.calcularTotal();
            },
            deep: true
        },
        'datosFac.factura.re': {
            handler: function () {
                this.calcularTotal();
            },
            deep: true
        },
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
        },
        calcularTotal(){
            let total = 0;
            let totalBases = 0;
            for(let i = 0; i < this.datosFac.factura.bases.length; i++){
                totalBases += this.datosFac.factura.bases[i].valor;
                total += this.datosFac.factura.bases[i].valor;
                total += this.datosFac.factura.bases[i].valor * (this.datosFac.factura.bases[i].porcentaje/100);
                if(this.datosFac.factura.re){
                    total += this.datosFac.factura.bases[i].valor * (this.datosFac.factura.bases[i].rePor/100);
                }
            }
            total -= totalBases * (this.datosFac.factura.retencion.porcentaje/100);
            this.datosFac.factura.total = total.toFixed(2);
        },
        cambioEspecial(especial){
            if(especial == 5){
                this.datosFac.factura.re = true;
            } else {
                this.datosFac.factura.re = false;
            }
            this.calcularTotal();
        },
        sincronicarRE(){
            if(!this.datosFac.factura.re){
                this.datosFac.factura.especial = 5;
            } else{
                this.datosFac.factura.especial = 0;
            }
        },

        // DESCARGAR VALORES SELECT
        async listaTipos() {
            const docRef = doc(db, "listasFacSelect", "tipos");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.tipos = docSnap.data();
                console.log(this.tipos);
            } else {
                console.log("No se ha encontrado la lista tipos.");
            }
        },
        async listaEspecial() {
            const docRef = doc(db, "listasFacSelect", "especial");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.especial = docSnap.data();
                console.log(this.especial);
            } else {
                console.log("No se ha encontrado la lista especial.");
            }
        },
        async listaRetencion() {
            const docRef = doc(db, "listasFacSelect", "retenciones");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.retenciones = docSnap.data();
                console.log(this.retenciones);
            } else {
                console.log("No se ha encontrado la lista retenciones.");
            }
        },
    },
    mounted() {
        this.listaTipos();
        this.listaEspecial();
        this.listaRetencion();
    },
    created(){
    }
}
</script>

<style scoped>
</style>