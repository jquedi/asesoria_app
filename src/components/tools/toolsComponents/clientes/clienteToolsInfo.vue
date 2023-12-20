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
                        <img src="@/assets/iconos/ejemploFac.jpeg" alt="">
                    </div>
                    <div class="miniaturaFacturaDatos">
                        <div class="miniaturaFacturaDato">
                            Nombre: <strong>{{ factura.datos.proveedor.nombre }}</strong>
                        </div>
                        <div class="miniaturaFacturaDato">
                            Fecha: <strong>{{ factura.datos.factura.tiempo.fecha }}</strong>
                        </div>
                        <div class="miniaturaFacturaDato">
                            Importe: <strong>{{ factura.datos.factura.importe.total }}</strong>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    </div>
</template>
<script>
import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { storage } from '/workspaces/asesoria_app/src/firebase.js'; // Asegúrate de exportar 'storage' desde tu archivo de configuración de Firebase.


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
            facturas:{
                1: {
                    procesado: true,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                2: {
                    procesado: true,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                3: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                4: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                5: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                6: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                7: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                8: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                9: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                10: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
                11: {
                    procesado: false,
                    datos:{
                        proveedor:{
                            nif: '12345678A',
                            nombre: 'Maderas S.A.',
                            postal: '12345',
                        },
                        factura:{
                            tiempo: {
                                fecha: '2023-11-30',
                                periodo: '4T',
                                ejercicio: '2023',
                            },
                            info: {
                                Numerofactura: '123456',
                                tipo: 'COMPRAS',
                                especial: '',
                                actividad: 'Actividad',
                                adicional: '',
                            },
                            importe: {
                                total: '1000',
                                bases: {
                                    base1: [21, 1000],
                                    base2: [10, 0],
                                    base3: [4, 0],
                                    base4: [0, 0],
                                },
                                retencion: {
                                    tipo: 'ALQUILERES',
                                    porcentaje: '19',
                                },
                                recargos: {
                                    5.20: '0',
                                    1.40: '0',
                                    0.50: '0',
                                },

                            },
                        }
                    },
                },
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
        seleccionarArchivos(event) {
            this.archivosSeleccionados = event.target.files;
        },
        async subirArchivos() {
            for (let i = 0; i < this.archivosSeleccionados.length; i++) {
                const file = this.archivosSeleccionados[i];
                const uniqueIdentifier = `${this.cliente.nif}-${Date.now()}-${i}`; // Identificador único
                const storagePath = `facturas/${uniqueIdentifier}`; // Ruta con el identificador único

                const fileRef = storageRef(storage, storagePath);
                
                try {
                const snapshot = await uploadBytes(fileRef, file);
                console.log(`Archivo ${file.name} subido con éxito como ${uniqueIdentifier}`);
                } catch (error) {
                console.error(`Error subiendo el archivo ${file.name}:`, error);
                }
            }
            // Limpiar la selección después de la carga
            this.archivosSeleccionados = [];
        },
    },
    mounted() {
        this.contarSinProcesar();
    },
    created(){
    }
}
</script>

<style scoped>
</style>