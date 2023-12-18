<script setup>
    import botonCerrar from '@/components/comunes/botonCerrar.vue';
    import botonFiltro from '@/components/comunes/botonFiltro.vue';
    import botonAñadir from '@/components/comunes/botonAñadir.vue';
    import notificacionAlerta from '@/components/comunes/notificacionAlerta.vue';

    defineProps(['cliente'])
    
    const emit = defineEmits(['cerrar', 'añadir', 'abrirFiltro']);
    
</script>

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
        <div class="clienteToolsInfoDocs">
            <notificacionAlerta v-if="contSinProcesar > 0" :valor="contSinProcesar" />
            <botonAñadir @añadir="añadir" />
            <botonFiltro @abrirFiltro="abrirFiltro" />
            <div class="cajaFiltros" v-if="filtroOpen">
                <input type="checkbox" v-model="filtros.Procesado"> <div>Sin procesar</div>
            </div>
            <input v-if="añadirOpen" type="file" name="botonSelect" multiple="multiple" placeholder="Selecccionar Archivos">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filtroOpen: false,
            añadirOpen: false,
            contSinProcesar: 0,
            filtros: {
                Procesado: false,
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
                                bases: {
                                    21: '1000',
                                    10: '0',
                                    4: '0',
                                    0: '0',
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
            this.emit('cerrar');
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
        }
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