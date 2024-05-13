<template>
    <div :class="classValue" class="fondoOscurecido" @click="cerrar">
    </div>
    <div :class="classValue" id="chat" class="tool flex flex-row flex-nowrap">
        <botonCerrar @cerrar="cerrar" />
        <div class="chatUsuariosLista">
            <div class="flex flex-col gap-3 mt-6"> 
                <div v-for="usuario in usuarios" class="chatUsuario" >{{ usuario.abreviatura }}</div>
            </div>
        </div>
        <div class="chatLista basis-1/5" v-show="listaShow == true">
            <div class="chatActivos" v-for="activo in activos">
                {{ activo.cliente.nombre }} {{ activo.cliente.apellido }}
            </div>
        </div>
        <div class="grow h-full flex flex-col">
            <div style="min-height: 60px;" class="chatHeader"></div>
            <div class="chatChat grow" id="chat-container">
                <div class="chatMinimizarFlecha1" @click="listaShow = !listaShow">
                    <div :class="chatMinimizarLateralIz1"></div>
                    <div :class="chatMinimizarLateralIz2"></div>
                </div>
                <!-- <div class="chatMinimizarFlecha2" @click="asistenteShow = !asistenteShow">
                    <div :class="chatMinimizarLateralDch1"></div>
                    <div :class="chatMinimizarLateralDch2"></div>
                </div> -->
                <mensaje v-for="mensaje in mensajes" :tipo="mensaje.tipo" :texto="mensaje.texto" :hora="mensaje.hora"/>
                
            </div>
            <div class="chatCajaTexto">
                <span class="chatInput" role="textbox" ref="chatInput" contenteditable></span>
                <svg @click="getInput" class="chatBotonEnviar" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="ic_fluent_send_28_filled" fill="white" fill-rule="nonzero">
                            <path d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z" id="🎨-Color">

                </path>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
        <!-- <div class="chatAsistente basis-1/4" v-show="asistenteShow == true"></div> -->
    </div>
</template>
<script>
import botonCerrar from '../comunes/botonCerrar.vue';
import mensaje from './toolsComponents/chat/mensaje.vue';
export default {
    components: {
        botonCerrar, 
        mensaje
    },
    props: {
        classValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            listaShow: true,
            asistenteShow: true,
            chatMinimizarLateralDch1: "chatMinimizarLateralDch1",
            chatMinimizarLateralDch2: "chatMinimizarLateralDch2",
            chatMinimizarLateralIz1: "chatMinimizarLateralIz1",
            chatMinimizarLateralIz2: "chatMinimizarLateralIz2",
            usuarios: {
                1: {
                    id: 1,
                    usuario: 'Fani',
                    abreviatura: "FA"
                },
                2: {
                    id: 2,
                    usuario: 'Rafa',
                    abreviatura: "RA"
                },
                3: {
                    id: 3,
                    usuario: 'Patricia',
                    abreviatura: "PA"
                },
                4: {
                    id: 4,
                    usuario: 'Jorge',
                    abreviatura: "JO"
                },
            },
            activos: {
                1: {
                    id: 1,
                    usuarios: [1, 2],
                    cliente: {
                        id: 1,
                        nombre: 'Juan',
                        apellido: 'Perez',
                        movil: '123456789',
                        img: 'https://www.w3schools.com/howto/img_avatar.png'
                    }
                },
                2: {
                    id: 2,
                    usuarios: [3, 4],
                    cliente: {
                        id: 2,
                        nombre: 'Pedro',
                        apellido: 'Gomez',
                        movil: '123456789',
                        img: 'https://www.w3schools.com/howto/img_avatar.png'
                    }
                },
                3: {
                    id: 3,
                    usuarios: [1],
                    cliente: {
                        id: 3,
                        nombre: 'Manuel',
                        apellido: 'Garcia Oliveiros',
                        movil: '123456789',
                        img: 'https://www.w3schools.com/howto/img_avatar.png'
                    }
                },
                
            },
            mensajes: {
                1: {
                    tipo: "pregunta",
                    texto: "Hola, me llamo mari",
                    hora: "14/02/2024 06:21"
                },
                2: {
                    tipo: "respuesta",
                    texto: "buenos dias, Mari",
                    hora: "14/02/2024 06:21"
                },
                3: {
                    tipo: "respuesta",
                    texto: "en que puedo ayudarte?",
                    hora: "14/02/2024 06:21"
                },
                4: {
                    tipo: "pregunta",
                    texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae justo tempus, eleifend lacus id, interdum odio. Suspendisse ipsum ex, molestie et imperdiet sit amet, porta non sem. Fusce massa mi, rutrum nec ex quis, cursus venenatis nisi. Etiam blandit justo vel leo feugiat sollicitudin. Donec nunc magna, rhoncus sit amet magna ac, tincidunt elementum nisi. Suspendisse faucibus varius mauris, quis condimentum nisl tristique at. Mauris libero massa, rutrum ut nulla at, rutrum dignissim orci. Morbi commodo eros sit amet erat viverra, at iaculis elit sagittis. Vivamus nisi odio, condimentum quis purus a, consequat consequat ex. Cras at odio sit amet neque laoreet blandit. Nulla imperdiet fermentum gravida. Sed pharetra lacus volutpat, rhoncus ligula sagittis, tristique eros. Donec et vulputate enim, id eleifend ante. Donec nec rutrum tellus. Phasellus porttitor vel libero ut vehicula. Fusce non interdum augue. Quisque dignissim, nisl eget pretium pharetra, purus magna suscipit libero, a euismod est lectus imperdiet est. Donec nibh ex, consequat ac turpis sagittis, iaculis rhoncus urna. Phasellus quis lectus efficitur, pretium ante vel, mattis mi. Fusce volutpat leo purus, a ultrices risus vehicula ut. Proin elementum libero sed purus blandit dictum. Phasellus nec sodales ex, a congue arcu. Nunc rhoncus mauris eu volutpat venenatis. Nullam laoreet sagittis lacus. Duis imperdiet finibus ligula in interdum. Mauris commodo nec leo eu posuere. Praesent pulvinar blandit nulla at ornare.",
                    hora: "14/02/2024 06:21"
                },
            }
        }
    },
    watch: {
        listaShow: function (val) {
            if (val == true) {
                this.chatMinimizarLateralIz1 = "chatMinimizarLateralIz1";
                this.chatMinimizarLateralIz2 = "chatMinimizarLateralIz2";
            } else {
                this.chatMinimizarLateralIz1 = "chatMinimizarLateralDch1";
                this.chatMinimizarLateralIz2 = "chatMinimizarLateralDch2";
            }
        },
        asistenteShow: function (val) {
            if (val == true) {
                this.chatMinimizarLateralDch1 = "chatMinimizarLateralDch1";
                this.chatMinimizarLateralDch2 = "chatMinimizarLateralDch2";
            } else {
                this.chatMinimizarLateralDch1 = "chatMinimizarLateralIz1";
                this.chatMinimizarLateralDch2 = "chatMinimizarLateralIz2";
            }
        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrar');
        },
        scroll(){
            const chatContainer = document.getElementById('chat-container');
            chatContainer.scrollTop = chatContainer.scrollHeight;
        },
        getInput(){
            const content = this.$refs.chatInput.innerHTML;
            console.log(content);
            this.$refs.chatInput.innerHTML = "";
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