<template>
    <div id="clienteToolsInfo" class="tool">
        <botonCerrar @cerrar="cerrar" />
        <div class="clienteToolsInfoDatos">
            <div class="clienteToolsInfoDatosNombre">
                {{ cliente.nombre }}
            </div>
            <div class="clienteToolsInfoDatosEmail">
                {{ cliente.email }}
            </div>
            <div class="clienteToolsInfoDatosTelefono">
                {{ cliente.telefono }}
            </div>
            <div class="clienteToolsInfoDatosDireccion">
                {{ cliente.direccion }}
            </div>
        </div>
        <notificacionAlerta style="bottom: 47%;top: auto;left: 3%;" v-if="contSinProcesar > 0" :valor="contSinProcesar" />
        <div class="clienteToolsInfoDocs">
            <botonAñadir @añadir="añadir" />
            <botonFiltro @abrirFiltro="abrirFiltro" />
            <div class="cajaFiltros" v-if="filtroOpen">
                <input type="checkbox" v-model="filtros.procesado"> <div>Sin procesar</div>
            </div>
            <input v-if="añadirOpen" type="file" @change="seleccionarArchivos" multiple>
            <button v-if="archivosSeleccionados.length" @click="subirArchivos">Confirmar</button>
  


            <div  style="" v-for="factura in facturas" >
                <div class="miniaturaFacturaDiv" v-if="!filtros.procesado || !factura.procesado">
                    <notificacionAlerta style="top: -7px;right: 10px;left: auto;" v-if="!factura.procesado" :valor="'!'" />
                    <div class="miniaturaFacturaImg">
                        <!-- <img src="@/assets/iconos/ejemploFac.jpeg" alt=""> -->
                        <img v-if="factura.imgUrls.length > 0" :src="factura.imgUrls[0]" alt="Miniatura de factura">
                    </div>
                    <div class="miniaturaFacturaDatos">
                        <div class="miniaturaFacturaDato">
                            Proveedor: <strong>{{ factura.proveedor }}</strong>
                        </div>
                        <div class="miniaturaFacturaDato">https://animeflv.net/
                            Fecha: <strong>{{ factura.fecha }}</strong>
                        </div>
                        <div class="miniaturaFacturaDato">
                            Importe: <strong>{{ factura.total }}</strong>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
</template>
<script>
// import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
// import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker';

// // Configurar el workerSrc globalmente
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;



import html2canvas from 'html2canvas';

import { db } from '/workspaces/asesoria_app/src/firebase.js';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from '/workspaces/asesoria_app/src/firebase.js'; // Asegúrate de exportar 'storage' desde tu archivo de configuración de Firebase.
import { doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';

import botonCerrar from '@/components/comunes/botonCerrar.vue';
import botonFiltro from '@/components/comunes/botonFiltro.vue';
import botonAñadir from '@/components/comunes/botonAñadir.vue';
import notificacionAlerta from '@/components/comunes/notificacionAlerta.vue';

export default {
    components: {
        botonCerrar,
        botonFiltro,
        botonAñadir,
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
            filtroOpen: false,
            añadirOpen: false,
            contSinProcesar: 0,
            archivosSeleccionados: [],
            filtros: {
                procesado: false,
            },
            archivosSubir: [],
            modeloFac: {
                texto: '',
                img: [],
                procesado: false,
                cliente: '',
                proveedor: '',
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
            },
            facturas:{
            }
        }
    },
    watch: {
    },
    methods: {
        cerrar(){
            this.$emit('cerrar');
        },
        añadir(){
            this.añadirOpen = !this.añadirOpen;
        },
        abrirFiltro(){
            this.filtroOpen = !this.filtroOpen;
        },
        contarSinProcesar(){
            let cont = 0;
            for (const key in this.facturas) {
                if (Object.hasOwnProperty.call(this.facturas, key)) {
                    const element = this.facturas[key];
                    if(!element.procesado){
                        cont++;
                    }
                }
            }
            this.contSinProcesar = cont;
        },


        // DESCARGAR LISTA DE FACTURAS
        async listaFacts() {
            const colRef = collection(db, "facturas");
            const q = query(colRef, where("cliente", "==", this.cliente.nif));

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const facturaPromises = querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const imgRefs = data.img.map((imgName) => {
                        const fileRef = storageRef(storage, `facturas/${imgName}`);
                        return getDownloadURL(fileRef); // Obtiene la URL de descarga
                    });

                    // Resuelve todas las promesas de getDownloadURL para obtener las URLs reales
                    const imgUrls = await Promise.all(imgRefs);
                    return {
                        ...data,
                        imgUrls // Agrega las URLs al objeto de la factura
                    };
                });

                // Espera a que todas las promesas de las facturas se resuelvan
                this.facturas = await Promise.all(facturaPromises);
                console.log(this.facturas);
                this.contarSinProcesar();   
            } else {
                console.log("No se han encontrado facturas.");
            }
        },



        // SUBIR FACTURAS

        seleccionarArchivos(event) {
            this.archivosSeleccionados = event.target.files;
        },
        async subirArchivos() {
            for (let i = 0; i < this.archivosSeleccionados.length; i++) {
                    const file = this.archivosSeleccionados[i];
                    const uniqueIdentifier = `${this.cliente.nif}-${Date.now()}-${i}`; // Identificador único
                    const storagePath = `facturas/${uniqueIdentifier}`; // Ruta con el identificador único
                    const fileRef = storageRef(storage, storagePath);

                    const datos = this.modeloFac;
                    
                if(file.type.startsWith('image/')){
                    datos.procesado = false;
                    datos.cliente = this.cliente.nif;
                    datos.img = [uniqueIdentifier];

                    await this.subirImagen(file, fileRef, uniqueIdentifier);
                    await this.subirDatos(datos, uniqueIdentifier);

                }else if(file.type === 'application/pdf'){
                    // FUNCION PARA CONVERTIR UN PDF A IMAGENES
                    const nombresImagenes = await this.convertirYSubirPDF(file, uniqueIdentifier, fileRef);
                    datos.procesado = false;
                    datos.cliente = this.cliente.nif;
                    datos.img = nombresImagenes;

                    await this.subirDatos(datos, uniqueIdentifier);

                }else{
                    console.log('Archivo no válido');
                }
            }
            // Limpiar la selección después de la carga
            this.archivosSeleccionados = [];
        },

        async convertirYSubirPDF(pdfFile, uniqueIdentifier, fileRef) {
            let nombresImagenes = [];
            try {
                const pdf = await getDocument({ url: URL.createObjectURL(pdfFile) }).promise;
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const viewport = page.getViewport({ scale: 1 });
                    const canvas = document.createElement('canvas');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
                    
                    const image = await html2canvas(canvas);
                    const imageBlob = await new Promise(resolve => image.toBlob(resolve));

                    const imageName = `${uniqueIdentifier}-page${pageNum}`;
                    await this.subirImagen(imageBlob, fileRef, imageName);
                    nombresImagenes.push(imageName);
                }
            } catch (error) {
                console.error('Error al convertir el PDF:', error);
            }
            return nombresImagenes;
        },
        async subirDatos(datos, uniqueIdentifier) {
            try {
                const docRef = doc(db, "facturas", uniqueIdentifier);
                await setDoc(docRef, datos);
                console.log(`Documento ${uniqueIdentifier} creado con éxito`);
            } catch (error) {
                console.error(`Error subiendo el archivo ${file.name}:`, error);
            }
        },
        async subirImagen(file, fileRef, uniqueIdentifier) {
            try {
                const snapshot = await uploadBytes(fileRef, file);
                console.log(`Archivo ${file.name} subido con éxito como ${uniqueIdentifier}`);
            } catch (error) {
                console.error(`Error subiendo el archivo ${file.name}:`, error);
            }
        }
    },
    mounted() {
        this.listaFacts();
    },
    created(){
    }
}
</script>

<style scoped>
</style>