<template>
        <div class="todolistConfirmarBorradoFondo" v-if="this.confirmacionBorrado != ''">
        </div>
        <div class="todolistConfirmarBorrado" v-if="this.confirmacionBorrado != ''">
            <p>Seguro que quieres borrar definitivamente esta tarea?</p>
            
            <button class="todolistBotonAñadir" @click="borrarTarea()">Si</button>
            <button class="todolistBotonCerrar" @click="this.confirmacionBorrado = ''">No</button>
        </div>
    <div :class="classValue" class="fondoOscurecido" @click="cerrar">
    </div>
    <div :class="classValue" class="tool" style="overflow: hidden;">
        <botonCerrar @cerrar="cerrar" />
        <div class="todolistUsuarios flex flex-row gap-3">
            <div v-for="usuario in usuarios" @click="this.usuarioSelected = usuario" class="todolistUsuario" >{{ usuario.abreviatura }}</div>
        </div>
        <svg class="todolistfiltroIcono" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" @click="this.filtroOpen = !this.filtroOpen">
            <path d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z"/>
        </svg>

        <div class="todolistfiltroForm" v-if="this.filtroOpen">
            <h1>Filtros</h1>
            
            <div class="grupo">
                <p class="tag">Ordenar por: </p>
                <select name="" id="" v-model="this.filtro.ordenar">
                    <option default value=""></option>
                    <option value="inicio">Fecha Inicio</option>
                    <option value="limite">Fecha Limite</option>
                    <option value="cliente">Cliente</option>
                    <option value="prio">Prioridad</option>
                </select>
            </div>
            
            <div class="grupo">
                <input
                type="checkbox"
                v-model="this.filtro.estado"
                />
                <!-- Muestra el nombre del usuario -->
                <label>Separar por estado</label>
            </div>
            <div class="grupo">
                <p class="tag">Cliente</p>
                <input type="text" v-model="this.filtro.cliente">
            </div>
            <div class="grupo">
                <p class="tag">Buscar por:</p>
                <input type="text" v-model="this.filtro.buscar">
            </div>
            <div class="grupo">
                <p class="tag">Inicio</p>
                <input type="date" v-model="this.filtro.fecha.inicio">
            </div>
            <div class="grupo">
                <p class="tag">Fin</p>
                <input type="date" v-model="this.filtro.fecha.fin">
            </div>
            <button class="grupo botonRestablecer" @click="reiniciarFiltro()">Restablecer</button>
        </div>
        
        <botonAñadir @añadir="añadir" />

        <div class="todolistContenedor">
            <div class="todolistTarea" v-for="(tarea, index) in tareasShow" :key="tarea.id">
                <div class="todolistTarea2 flex flex-row z-20" v-if="tarea.usuarios.includes(this.usuarioSelected.id) && !this.filtro.estado" @mouseleave="tarea.mostrarOpciones = false">
                    <notificacionAlerta style="right: 10px;left: auto;top: -18px;" :valor="alertaFechaLimite(tarea)"/>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            CLIENTE
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.clienteNombre }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            ASUNTO
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.asunto }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            FECHA
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.creacion }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            LIMITE
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.limite }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            PRIO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ buscarValores(tarea.prioridad, "prio") }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min">
                        <div class="todolistCampoTareaTitulo border-b-2 border-white">
                            ESTADO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea pl-2 pr-2">
                            <select style="color: black;" name="" id="" v-model="tarea.estado" @change="modificarTarea(tarea)">
                                <option v-for="estado in estadoList" :value="estado.val">{{estado.desc}}</option>
                            </select>
                            <!-- {{ buscarValores(tarea.estado, "estado") }} -->
                        </div>
                    </div>
                    <trespuntosBoton style="margin-left: 10px;top: 32px;" @click="tarea.mostrarOpciones = !tarea.mostrarOpciones" />
                    <div class="opcionesTarea" v-if="tarea.mostrarOpciones">
                        <button @click="tarea.mostrarOpciones = false; editarTarea(tarea)">Editar</button>
                        <button @click="tarea.mostrarOpciones = false; this.confirmacionBorrado = tarea.id">Eliminar</button>
                    </div>
                </div>
                <div v-if="tarea.mostrarActualizaciones && tarea.usuarios.includes(this.usuarioSelected.id) && !this.filtro.estado" class="todolistActualizaciones z-10">
                    <h1 class="text-xl font-bold underline text-white">ACTUALIZACIONES</h1>
                    <button class="todolistAñadirActualizacionesButton" @click="tarea.mostrarActualizacionesAñadir = !tarea.mostrarActualizacionesAñadir">+</button>

                    <div class="todolistAñadirActualizacionesTextarea flex flex-col" v-if="tarea.mostrarActualizacionesAñadir">
                        <textarea name="" id="" cols="30" rows="4" v-model="textAreaAcualizaciones"></textarea>
                        <div class="flex flex-row justify-between mt-4">
                            <button class="todolistAñadirActualizacionesTextareaGuardar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('guardar', tarea)">Guardar</button>
                            <button class="todolistAñadirActualizacionesTextareaCancelar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('cancelar', tarea)">Cancelar</button>
                        </div>
                    </div>

                    <div class="todolistActualizacion" v-for="actualizacion in tarea.actualizaciones">
                        <div class="todolistActualizacionTitulo">
                            {{ actualizacion.usuario }} | {{ actualizacion.fecha }}
                        </div>
                        <div class="todolistActualizacionCuerpo">
                            {{ actualizacion.texto }}
                        </div>
                    </div>
                </div>
            </div>

<!-- Estado pendiente -->
            <p v-if="this.filtro.estado && this.estadoList.length > 0">{{this.estadoList[0].desc}}</p>
            <div class="todolistTarea" v-for="(tarea, index) in tareasShow" :key="tarea.id">
                <div class="todolistTarea2 flex flex-row z-20" v-if="tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 1" @mouseleave="tarea.mostrarOpciones = false">
                    <notificacionAlerta style="right: 10px;left: auto;top: -18px;" :valor="alertaFechaLimite(tarea)"/>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            CLIENTE
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.clienteNombre }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            ASUNTO
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.asunto }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            FECHA
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.creacion }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            LIMITE
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.limite }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            PRIO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ buscarValores(tarea.prioridad, "prio") }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min">
                        <div class="todolistCampoTareaTitulo border-b-2 border-white">
                            ESTADO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea pl-2 pr-2">
                            <select style="color: black;" name="" id="" v-model="tarea.estado" @change="modificarTarea(tarea)">
                                <option v-for="estado in estadoList" :value="estado.val">{{estado.desc}}</option>
                            </select>
                            <!-- {{ buscarValores(tarea.estado, "estado") }} -->
                        </div>
                    </div>
                    <trespuntosBoton style="margin-left: 10px;top: 32px;" @click="tarea.mostrarOpciones = !tarea.mostrarOpciones" />
                    <div class="opcionesTarea" v-if="tarea.mostrarOpciones">
                        <button @click="tarea.mostrarOpciones = false; editarTarea(tarea)">Editar</button>
                        <button @click="tarea.mostrarOpciones = false; this.confirmacionBorrado = tarea.id">Eliminar</button>
                    </div>
                </div>
                <div v-if="tarea.mostrarActualizaciones && tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 1" class="todolistActualizaciones z-10">
                    <h1 class="text-xl font-bold underline text-white">ACTUALIZACIONES</h1>
                    <button class="todolistAñadirActualizacionesButton" @click="tarea.mostrarActualizacionesAñadir = !tarea.mostrarActualizacionesAñadir">+</button>

                    <div class="todolistAñadirActualizacionesTextarea flex flex-col" v-if="tarea.mostrarActualizacionesAñadir">
                        <textarea name="" id="" cols="30" rows="4" v-model="textAreaAcualizaciones"></textarea>
                        <div class="flex flex-row justify-between mt-4">
                            <button class="todolistAñadirActualizacionesTextareaGuardar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('guardar', tarea)">Guardar</button>
                            <button class="todolistAñadirActualizacionesTextareaCancelar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('cancelar', tarea)">Cancelar</button>
                        </div>
                    </div>

                    <div class="todolistActualizacion" v-for="actualizacion in tarea.actualizaciones">
                        <div class="todolistActualizacionTitulo">
                            {{ actualizacion.usuario }} | {{ actualizacion.fecha }}
                        </div>
                        <div class="todolistActualizacionCuerpo">
                            {{ actualizacion.texto }}
                        </div>
                    </div>
                </div>
            </div>

<!-- Estado en proceso -->
            <p v-if="this.filtro.estado && this.estadoList.length > 0">{{this.estadoList[1].desc}}</p>
            <div class="todolistTarea" v-for="(tarea, index) in tareasShow" :key="tarea.id">
                <div class="todolistTarea2 flex flex-row z-20" v-if="tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 2" @mouseleave="tarea.mostrarOpciones = false">
                    <notificacionAlerta style="right: 10px;left: auto;top: -18px;" :valor="alertaFechaLimite(tarea)"/>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            CLIENTE
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.clienteNombre }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            ASUNTO
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.asunto }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            FECHA
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.creacion }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            LIMITE
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.limite }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            PRIO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ buscarValores(tarea.prioridad, "prio") }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min">
                        <div class="todolistCampoTareaTitulo border-b-2 border-white">
                            ESTADO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea pl-2 pr-2">
                            <select style="color: black;" name="" id="" v-model="tarea.estado" @change="modificarTarea(tarea)">
                                <option v-for="estado in estadoList" :value="estado.val">{{estado.desc}}</option>
                            </select>
                            <!-- {{ buscarValores(tarea.estado, "estado") }} -->
                        </div>
                    </div>
                    <trespuntosBoton style="margin-left: 10px;top: 32px;" @click="tarea.mostrarOpciones = !tarea.mostrarOpciones" />
                    <div class="opcionesTarea" v-if="tarea.mostrarOpciones">
                        <button @click="tarea.mostrarOpciones = false; editarTarea(tarea)">Editar</button>
                        <button @click="tarea.mostrarOpciones = false; this.confirmacionBorrado = tarea.id">Eliminar</button>
                    </div>
                </div>
                <div v-if="tarea.mostrarActualizaciones && tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 2" class="todolistActualizaciones z-10">
                    <h1 class="text-xl font-bold underline text-white">ACTUALIZACIONES</h1>
                    <button class="todolistAñadirActualizacionesButton" @click="tarea.mostrarActualizacionesAñadir = !tarea.mostrarActualizacionesAñadir">+</button>

                    <div class="todolistAñadirActualizacionesTextarea flex flex-col" v-if="tarea.mostrarActualizacionesAñadir">
                        <textarea name="" id="" cols="30" rows="4" v-model="textAreaAcualizaciones"></textarea>
                        <div class="flex flex-row justify-between mt-4">
                            <button class="todolistAñadirActualizacionesTextareaGuardar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('guardar', tarea)">Guardar</button>
                            <button class="todolistAñadirActualizacionesTextareaCancelar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('cancelar', tarea)">Cancelar</button>
                        </div>
                    </div>

                    <div class="todolistActualizacion" v-for="actualizacion in tarea.actualizaciones">
                        <div class="todolistActualizacionTitulo">
                            {{ actualizacion.usuario }} | {{ actualizacion.fecha }}
                        </div>
                        <div class="todolistActualizacionCuerpo">
                            {{ actualizacion.texto }}
                        </div>
                    </div>
                </div>
            </div>

<!-- Estado a la espera -->
            <p v-if="this.filtro.estado && this.estadoList.length > 0">{{this.estadoList[2].desc}}</p>
            <div class="todolistTarea" v-for="(tarea, index) in tareasShow" :key="tarea.id">
                <div class="todolistTarea2 flex flex-row z-20" v-if="tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 3" @mouseleave="tarea.mostrarOpciones = false">
                    <notificacionAlerta style="right: 10px;left: auto;top: -18px;" :valor="alertaFechaLimite(tarea)"/>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            CLIENTE
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.clienteNombre }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            ASUNTO
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.asunto }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            FECHA
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.creacion }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            LIMITE
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.limite }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            PRIO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ buscarValores(tarea.prioridad, "prio") }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min">
                        <div class="todolistCampoTareaTitulo border-b-2 border-white">
                            ESTADO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea pl-2 pr-2">
                            <select style="color: black;" name="" id="" v-model="tarea.estado" @change="modificarTarea(tarea)">
                                <option v-for="estado in estadoList" :value="estado.val">{{estado.desc}}</option>
                            </select>
                            <!-- {{ buscarValores(tarea.estado, "estado") }} -->
                        </div>
                    </div>
                    <trespuntosBoton style="margin-left: 10px;top: 32px;" @click="tarea.mostrarOpciones = !tarea.mostrarOpciones" />
                    <div class="opcionesTarea" v-if="tarea.mostrarOpciones">
                        <button @click="tarea.mostrarOpciones = false; editarTarea(tarea)">Editar</button>
                        <button @click="tarea.mostrarOpciones = false; this.confirmacionBorrado = tarea.id">Eliminar</button>
                    </div>
                </div>
                <div v-if="tarea.mostrarActualizaciones && tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 3" class="todolistActualizaciones z-10">
                    <h1 class="text-xl font-bold underline text-white">ACTUALIZACIONES</h1>
                    <button class="todolistAñadirActualizacionesButton" @click="tarea.mostrarActualizacionesAñadir = !tarea.mostrarActualizacionesAñadir">+</button>

                    <div class="todolistAñadirActualizacionesTextarea flex flex-col" v-if="tarea.mostrarActualizacionesAñadir">
                        <textarea name="" id="" cols="30" rows="4" v-model="textAreaAcualizaciones"></textarea>
                        <div class="flex flex-row justify-between mt-4">
                            <button class="todolistAñadirActualizacionesTextareaGuardar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('guardar', tarea)">Guardar</button>
                            <button class="todolistAñadirActualizacionesTextareaCancelar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('cancelar', tarea)">Cancelar</button>
                        </div>
                    </div>

                    <div class="todolistActualizacion" v-for="actualizacion in tarea.actualizaciones">
                        <div class="todolistActualizacionTitulo">
                            {{ actualizacion.usuario }} | {{ actualizacion.fecha }}
                        </div>
                        <div class="todolistActualizacionCuerpo">
                            {{ actualizacion.texto }}
                        </div>
                    </div>
                </div>
            </div>

<!-- Estado completado -->
            <p v-if="this.filtro.estado && this.estadoList.length > 0">{{this.estadoList[3].desc}}</p>
            <div class="todolistTarea" v-for="(tarea, index) in tareasShow" :key="tarea.id">
                <div class="todolistTarea2 flex flex-row z-20" v-if="tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 4" @mouseleave="tarea.mostrarOpciones = false">
                    <notificacionAlerta style="right: 10px;left: auto;top: -18px;" :valor="alertaFechaLimite(tarea)"/>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            CLIENTE
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.clienteNombre }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-grow w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            ASUNTO
                        </div>
                        <div class="todolistCampoTareaCont border-r-2 border-white pl-2 pr-2">
                            {{ tarea.asunto }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            FECHA
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.creacion }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            LIMITE
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ tarea.fecha.limite }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min" @click="toggleActualizaciones(tarea)">
                        <div class="todolistCampoTareaTitulo border-b-2 border-r-2 border-white">
                            PRIO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea border-r-2 border-white pl-2 pr-2">
                            {{ buscarValores(tarea.prioridad, "prio") }}
                        </div>
                    </div>
                    <div class="todolistCampoTarea flex-shrink w-min">
                        <div class="todolistCampoTareaTitulo border-b-2 border-white">
                            ESTADO
                        </div>
                        <div class="todolistCampoTareaCont nosaltodelinea pl-2 pr-2">
                            <select style="color: black;" name="" id="" v-model="tarea.estado" @change="modificarTarea(tarea)">
                                <option v-for="estado in estadoList" :value="estado.val">{{estado.desc}}</option>
                            </select>
                            <!-- {{ buscarValores(tarea.estado, "estado") }} -->
                        </div>
                    </div>
                    <trespuntosBoton style="margin-left: 10px;top: 32px;" @click="tarea.mostrarOpciones = !tarea.mostrarOpciones" />
                    <div class="opcionesTarea" v-if="tarea.mostrarOpciones">
                        <button @click="tarea.mostrarOpciones = false; editarTarea(tarea)">Editar</button>
                        <button @click="tarea.mostrarOpciones = false; this.confirmacionBorrado = tarea.id">Eliminar</button>
                    </div>
                </div>
                <div v-if="tarea.mostrarActualizaciones && tarea.usuarios.includes(this.usuarioSelected.id) && this.filtro.estado && tarea.estado == 4" class="todolistActualizaciones z-10">
                    <h1 class="text-xl font-bold underline text-white">ACTUALIZACIONES</h1>
                    <button class="todolistAñadirActualizacionesButton" @click="tarea.mostrarActualizacionesAñadir = !tarea.mostrarActualizacionesAñadir">+</button>

                    <div class="todolistAñadirActualizacionesTextarea flex flex-col" v-if="tarea.mostrarActualizacionesAñadir">
                        <textarea name="" id="" cols="30" rows="4" v-model="textAreaAcualizaciones"></textarea>
                        <div class="flex flex-row justify-between mt-4">
                            <button class="todolistAñadirActualizacionesTextareaGuardar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('guardar', tarea)">Guardar</button>
                            <button class="todolistAñadirActualizacionesTextareaCancelar" @click="tarea.mostrarActualizacionesAñadir = false; cerrarFormAñadirActualizacion('cancelar', tarea)">Cancelar</button>
                        </div>
                    </div>

                    <div class="todolistActualizacion" v-for="actualizacion in tarea.actualizaciones">
                        <div class="todolistActualizacionTitulo">
                            {{ actualizacion.usuario }} | {{ actualizacion.fecha }}
                        </div>
                        <div class="todolistActualizacionCuerpo">
                            {{ actualizacion.texto }}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="todolistFormAñadir flex flex-wrap gap-6" v-if="this.formNuevo">
            <p class="titulo">Nueva Tarea</p>
            <div class="grupo">
                <p class="tag">Usuario</p>
                <button class="todolistFormAñadirUsuarioInput" @click="toggleDropdown">{{ this.usuarioBoton }}</button>

                <div v-if="showDropdown" class="dropdown-list">
                    <!-- Iteración sobre el objeto 'usuarios' -->
                    <div v-for="usuario in usuarios" :key="usuario.id" class="dropdown-item">
                        <!-- Checkbox con v-model para el array 'usuariosSeleccionados' -->
                        <input
                        type="checkbox"
                        :value="usuario.id"
                        v-model="this.tareaNueva.usuarios"
                        />
                        <!-- Muestra el nombre del usuario -->
                        <label>{{ usuario.nombre }}</label>
                    </div>
                </div>


            </div>
            <div class="grupo">
                <p class="tag">Cliente</p>
                <input type="text" v-model="this.tareaNueva.clienteNombre">
            </div>
            <div class="grupo">
                <p class="tag">Asunto</p>
                <input type="text" placeholder="Titulo" v-model="this.tareaNueva.asunto">
                <textarea placeholder="Descripción" rows="4" cols="50" v-model="this.tareaNueva_actualizaciones" v-if="this.tareaNueva.id == -1"></textarea>
            </div>
            <div class="grupo">
                <p class="tag">Fecha</p>
                <input type="date" v-model="this.tareaNueva.fecha.creacion">
            </div>
            <div class="grupo">
                <p class="tag">Limite</p>
                <input type="date" v-model="this.tareaNueva.fecha.limite">
            </div>
            <div class="grupo">
                <p class="tag">Prioridad</p>
                <select name="" id="" v-model="this.tareaNueva.prioridad">
                    <option v-for="prio in prioList" :value="prio.val">{{prio.desc}}</option>
                </select>
            </div>
            <div class="grupo">
                <p class="tag">Estado</p>
                <select name="" id="" v-model="this.tareaNueva.estado">
                    <option v-for="estado in estadoList" :value="estado.val">{{estado.desc}}</option>
                </select>
            </div>


            <button class="todolistBotonAñadir" @click="cerrarFormAñadir('guardar')">Guardar</button>
            <button class="todolistBotonCerrar" @click="cerrarFormAñadir('cancelar')">Cancelar</button>
        </div>
        
    </div>
</template>
<script>
import { db } from '/workspaces/asesoria_app/src/firebase.js';
import { setDoc, doc, getDoc, addDoc, collection, getDocs, query, where, getFirestore, onSnapshot, deleteDoc } from 'firebase/firestore';


import { datosCliente } from '@/stores/counter'

import botonCerrar from '../comunes/botonCerrar.vue';
import botonAñadir from '../comunes/botonAñadir.vue';
import trespuntosBoton from '../comunes/trespuntosBoton.vue';
import notificacionAlerta from '../comunes/notificacionAlerta.vue';
export default {
    components: {
        botonCerrar,
        botonAñadir,
        trespuntosBoton,
        notificacionAlerta
    },
    props: {
        classValue: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            confirmacionBorrado: "",
            usuarioBoton: "Ninguno",
            showDropdown: false,
            filtroOpen: false,
            actualizacionesOpen: false,
            opcionesTarea: false,
            formNuevo: false,
            filtro: {
                buscar: "",
                ordenar: "",
                estado: true,
                cliente: "",
                fecha: {
                    inicio: "",
                    fin: ""
                }
            },
            filtroModelo: {
                buscar: "",
                ordenar: "",
                estado: true,
                cliente: "",
                fecha: {
                    inicio: "",
                    fin: ""
                }
            },
            estadoList: {
            },
            prioList: {
                1: {
                    val: 1,
                    desc: "Alta"
                },
                2: {
                    val: 2,
                    desc: "Media"
                },
                3: {
                    val: 3,
                    desc: "Baja"
                }
            },
            usuarioSelected: {
                    id: 1,
                    nombre: 'Fani',
                    abreviatura: "FA"
                },
            usuarios: {
                1: {
                    id: 1,
                    nombre: 'Fani',
                    abreviatura: "FA"
                },
                2: {
                    id: 2,
                    nombre: 'Rafa',
                    abreviatura: "RA"
                },
                3: {
                    id: 3,
                    nombre: 'Patricia',
                    abreviatura: "PA"
                },
                4: {
                    id: 4,
                    nombre: 'Jorge',
                    abreviatura: "JO"
                },
            },
            tareaModelo: {
                id: -1,
                usuarios: [],
                clienteID: 0,
                clienteNombre: "",
                asunto: "",
                fecha: {
                    limite: "",
                    creacion: ""
                },
                prioridad: 2,
                estado: 1,
                recursividad: {
                    cantidad: 0,
                    tipo: "dia"
                },
                actualizaciones: {
                },
                mostrarActualizaciones: false,
                mostrarOpciones: false,
                mostrarActualizacionesAñadir: false,
            },
            tareaNueva_actualizaciones: "",
            textAreaAcualizaciones: "",
            tareaNueva: {
                id: -1,
                usuarios: [],
                clienteID: 0,
                clienteNombre: "",
                asunto: "",
                fecha: {
                    limite: "",
                    creacion: ""
                },
                prioridad: 2,
                estado: 1,
                recursividad: {
                    cantidad: 0,
                    tipo: "dia"
                },
                actualizaciones: {
                },
                mostrarActualizaciones: false,
                mostrarOpciones: false,
                mostrarActualizacionesAñadir: false,
            },
            tareas: {
                0: {
                    id: 1,
                    usuarios: [1, 2],
                    clienteID: 0,
                    clienteNombre: "Juan Manuel Hernandez Pendejo",
                    asunto: "Hay que llamarle por un tema de hacienda",
                    fecha: {
                        limite: "30/10/2024",
                        creacion: "24/10/2024"
                    },
                    prioridad: "Media",
                    estado: "Pendiente",
                    recursividad: {
                        cantidad: 2,
                        tipo: "semana"
                    },
                    actualizaciones: {
                    },
                    mostrarActualizaciones: false,
                },
                1: {
                    id: 1,
                    usuarios: [1, 3],
                    clienteID: 0,
                    clienteNombre: "Juan Manuel Hernandez Pendejo",
                    asunto: "Hay que llamarle por un tema de hacienda",
                    fecha: {
                        limite: "30/10/2024",
                        creacion: "24/10/2024"
                    },
                    prioridad: "Media",
                    estado: "Pendiente",
                    recursividad: {
                        cantidad: 2,
                        tipo: "semana"
                    },
                    actualizaciones: {
                        1: {
                            usuario: 1,
                            fecha: "26/10/2024",
                            texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae justo tempus, eleifend lacus id, interdum odio. Suspendisse ipsum ex, molestie et imperdiet sit amet, porta non sem. Fusce massa mi, rutrum nec ex quis, cursus venenatis nisi. Etiam blandit justo vel leo feugiat sollicitudin. Donec nunc magna, rhoncus sit amet magna ac, tincidunt elementum nisi. Suspendisse faucibus varius mauris, quis condimentum nisl tristique at. Mauris libero massa, rutrum ut nulla at, rutrum dignissim orci. Morbi commodo eros sit amet erat viverra, at iaculis elit sagittis. Vivamus nisi odio, condimentum quis purus a, consequat consequat ex. Cras at odio sit amet neque laoreet blandit. Nulla imperdiet fermentum gravida. Sed pharetra lacus volutpat, rhoncus ligula sagittis, tristique eros. Donec et vulputate enim, id eleifend ante. Donec nec rutrum tellus. Phasellus porttitor vel libero ut vehicula. Fusce non interdum augue. Quisque dignissim, nisl eget pretium pharetra, purus magna suscipit libero, a euismod est lectus imperdiet est. Donec nibh ex, consequat ac turpis sagittis, iaculis rhoncus urna. Phasellus quis lectus efficitur, pretium ante vel, mattis mi. Fusce volutpat leo purus, a ultrices risus vehicula ut. Proin elementum libero sed purus blandit dictum. Phasellus nec sodales ex, a congue arcu. Nunc rhoncus mauris eu volutpat venenatis. Nullam laoreet sagittis lacus. Duis imperdiet finibus ligula in interdum. Mauris commodo nec leo eu posuere. Praesent pulvinar blandit nulla at ornare.",
                        },
                        2: {
                            usuario: 2,
                            fecha: "26/10/2024",
                            texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae justo tempus, eleifend lacus id, interdum odio. Suspendisse ipsum ex, molestie et imperdiet sit amet, porta non sem. Fusce massa mi, rutrum nec ex quis, cursus venenatis nisi. Etiam blandit justo vel leo feugiat sollicitudin. Donec nunc magna, rhoncus sit amet magna ac, tincidunt elementum nisi. Suspendisse faucibus varius mauris, quis condimentum nisl tristique at. Mauris libero massa, rutrum ut nulla at, rutrum dignissim orci. Morbi commodo eros sit amet erat viverra, at iaculis elit sagittis. Vivamus nisi odio, condimentum quis purus a, consequat consequat ex. Cras at odio sit amet neque laoreet blandit. Nulla imperdiet fermentum gravida. Sed pharetra lacus volutpat, rhoncus ligula sagittis, tristique eros. Donec et vulputate enim, id eleifend ante. Donec nec rutrum tellus. Phasellus porttitor vel libero ut vehicula. Fusce non interdum augue. Quisque dignissim, nisl eget pretium pharetra, purus magna suscipit libero, a euismod est lectus imperdiet est. Donec nibh ex, consequat ac turpis sagittis, iaculis rhoncus urna. Phasellus quis lectus efficitur, pretium ante vel, mattis mi. Fusce volutpat leo purus, a ultrices risus vehicula ut. Proin elementum libero sed purus blandit dictum. Phasellus nec sodales ex, a congue arcu. Nunc rhoncus mauris eu volutpat venenatis. Nullam laoreet sagittis lacus. Duis imperdiet finibus ligula in interdum. Mauris commodo nec leo eu posuere. Praesent pulvinar blandit nulla at ornare.",
                        },
                        3: {
                            usuario: 3,
                            fecha: "26/10/2024",
                            texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae justo tempus, eleifend lacus id, interdum odio. Suspendisse ipsum ex, molestie et imperdiet sit amet, porta non sem. Fusce massa mi, rutrum nec ex quis, cursus venenatis nisi. Etiam blandit justo vel leo feugiat sollicitudin. Donec nunc magna, rhoncus sit amet magna ac, tincidunt elementum nisi. Suspendisse faucibus varius mauris, quis condimentum nisl tristique at. Mauris libero massa, rutrum ut nulla at, rutrum dignissim orci. Morbi commodo eros sit amet erat viverra, at iaculis elit sagittis. Vivamus nisi odio, condimentum quis purus a, consequat consequat ex. Cras at odio sit amet neque laoreet blandit. Nulla imperdiet fermentum gravida. Sed pharetra lacus volutpat, rhoncus ligula sagittis, tristique eros. Donec et vulputate enim, id eleifend ante. Donec nec rutrum tellus. Phasellus porttitor vel libero ut vehicula. Fusce non interdum augue. Quisque dignissim, nisl eget pretium pharetra, purus magna suscipit libero, a euismod est lectus imperdiet est. Donec nibh ex, consequat ac turpis sagittis, iaculis rhoncus urna. Phasellus quis lectus efficitur, pretium ante vel, mattis mi. Fusce volutpat leo purus, a ultrices risus vehicula ut. Proin elementum libero sed purus blandit dictum. Phasellus nec sodales ex, a congue arcu. Nunc rhoncus mauris eu volutpat venenatis. Nullam laoreet sagittis lacus. Duis imperdiet finibus ligula in interdum. Mauris commodo nec leo eu posuere. Praesent pulvinar blandit nulla at ornare.",
                        }
                    },
                    mostrarActualizaciones: false,
                },
            },
            tareasShow: {}
        }
    },
    watch: {
        'tareaNueva.usuarios': {
            handler: function (val) {
                if(val.length > 0){
                    this.usuarioBoton = "";
                    for(var i = 0; i < val.length; i++){
                        // this.usuarioBoton = i;
                        console.log(val);
                        console.log(val[0]);
                        
                        console.log(i);
                        console.log(val[i]);
                        this.usuarioBoton += this.usuarios[val[i]].nombre;
                        if(i != (val.length-1)){
                            this.usuarioBoton += ", ";
                        }
                    }
                }else{
                    this.usuarioBoton = "Ninguno"
                }
            },
            deep: true
        },
        'filtro': {
            handler: function () {
                console.log("entra1");
                this.aplicarFiltro();
            },
            deep: true
        },
    },
    methods: {
        reiniciarFiltro(){
            this.filtroModelo.estado = this.filtro.estado;
            this.filtro = JSON.parse(JSON.stringify(this.filtroModelo));
        },
        alertaFechaLimite(tarea){
            var devolver = "";
            
            const fechaF = new Date(tarea.fecha.limite);
            const hoy = new Date();

            fechaF.setHours(0, 0, 0, 0);
            hoy.setHours(0, 0, 0, 0);

            // Restar las marcas de tiempo y obtener la diferencia en milisegundos
            const diferenciaMilisegundos = fechaF.getTime() - hoy.getTime();

            // Convertir de milisegundos a días
            const diferenciaDias = Math.round(diferenciaMilisegundos / 86400000);

            if (diferenciaDias <= 3 && diferenciaDias > 0) {
                devolver = diferenciaDias.toString();
            } else if (diferenciaDias > 3) {
                devolver = "";
            } else if (diferenciaDias < 0) {
                devolver = "Tarde!";
            } else{
                devolver = "Hoy!";
            }
            
            return devolver;
        },
        ordenarTareas(tareas){
            if(this.filtro.ordenar != ""){
                return [...tareas].sort((a, b) => {
                    switch (this.filtro.ordenar) {
                        case 'inicio':
                        return new Date(a.fecha.creacion) - new Date(b.fecha.creacion);
                        case 'limite':
                        return new Date(a.fecha.limite) - new Date(b.fecha.limite);
                        case 'cliente':
                        return a.clienteNombre.localeCompare(b.clienteNombre);
                        case 'prio':
                        return a.prioridad - b.prioridad;
                        default:
                        return 0;
                    }
                });
            }else {
                return tareas;
            }
        },
        aplicarFiltro(){
            const t = [];
            for(var i = 0; this.tareas.length > i; i++){
                if(this.filtroFunction(this.tareas[i])){
                    t.push(
                        this.tareas[i]
                    );
                }
                this.tareasShow = this.ordenarTareas(t);
            }
        },
        
        filtroFunction(tarea){
            var resultado = true
            if(this.filtro.fecha.inicio != "" && this.filtro.fecha.fin != ""){
                const fechaT = new Date(tarea.fecha.creacion);
                const fechaF1 = new Date(this.filtro.fecha.inicio);
                const fechaF2 = new Date(this.filtro.fecha.fin);

                if(fechaT < fechaF1 || fechaT > fechaF2){
                    resultado = false;
                }
            }
            if(!tarea.asunto.includes(this.filtro.buscar)){
                resultado = false;
            }
            if(!tarea.clienteNombre.includes(this.filtro.cliente)){
                resultado = false;
            }

            return resultado;
        },
        cerrarFormAñadirActualizacion(accion, tareaOriginal){
            const tarea = JSON.parse(JSON.stringify(tareaOriginal));
            if(accion == "guardar"){
                // Obtener la fecha de hoy
                const hoy = new Date();

                // Obtener el día, mes y año
                const dia = hoy.getDate(); // Día del mes (1-31)
                const mes = hoy.getMonth() + 1; // Mes (0-11, +1 para obtener 1-12)
                const año = hoy.getFullYear(); // Año (e.g., 2024)

                var t = {
                    id: tarea.id,
                    usuarios: tarea.usuarios,
                    clienteID: tarea.clienteID,
                    clienteNombre: tarea.clienteNombre,
                    asunto: tarea.asunto,
                    fecha: tarea.fecha,
                    prioridad: tarea.prioridad,
                    estado: tarea.estado,
                    recursividad: tarea.recursividad,
                    actualizaciones: tarea.actualizaciones
                };

                // Determinar la próxima clave basada en las existentes
                const nuevasClaves = Object.keys(t.actualizaciones).map(Number).sort((a, b) => a - b);
                const proximaClave = nuevasClaves[nuevasClaves.length - 1] + 1;
                
                t.actualizaciones[proximaClave] = {
                    usuario: datosCliente().nombre,
                    fecha: `${año}-${mes}-${dia}`,
                    texto: this.textAreaAcualizaciones,
                };
                // console.log(tareaOriginal);
                // console.log(tarea);
                // console.log(t);
                
                this.modificarTarea(t);

            }

            this.textAreaAcualizaciones = "";
        },
        editarTarea(tarea){
            this.tareaNueva = JSON.parse(JSON.stringify(tarea));
            this.formNuevo = true;
        },
        async borrarTarea(){
            var id = this.confirmacionBorrado;
            const db = getFirestore();
            const docRef = doc(db, "tareas", id);

            try {
                await deleteDoc(docRef);
                console.log("Documento eliminado con éxito");
            } catch (error) {
                console.error("Error al eliminar el documento:", error);
            }
            this.confirmacionBorrado = '';
        },
        async modificarTarea(valor){
            var t = JSON.parse(JSON.stringify(valor));
            delete t.mostrarActualizaciones;
            delete t.mostrarOpciones;
            delete t.id;
            delete t.mostrarActualizacionesAñadir;
            try{
                const docRef = doc(db, "tareas", valor.id);
                await setDoc(docRef, t);
            } catch {
                console.error(error);
            }
        },
        buscarValores(valor, type) {
            var r = ""
            switch(type){
                case "prio":
                    for(var i = 0; this.prioList.length > i; i++){
                        if(this.prioList[i].val == valor){
                            r = this.prioList[i].desc;
                        }
                    }
                    break;
                case "estado":
                    for(var i = 0; this.estadoList.length > i; i++){
                        if(this.estadoList[i].val == valor){
                            r = this.estadoList[i].desc;
                        }
                    }
                    break;
            }
            return r;
        },
        cerrar(){
            this.$emit('cerrar');
        },
        
        añadir(){

            // Obtener la fecha de hoy
            const hoy = new Date();

            // Obtener el día, mes y año
            var dia = hoy.getDate(); // Día del mes (1-31)
            var mes = hoy.getMonth() + 1; // Mes (0-11, +1 para obtener 1-12)
            var año = hoy.getFullYear(); // Año (e.g., 2024)

            if(dia < 10){
                dia = "0" + dia;
            }
            if(mes < 10){
                mes = "0" + mes;
            }

            
            if(this.tareaNueva.fecha.creacion == ""){
                this.tareaNueva.fecha.creacion = `${año}-${mes}-${dia}`;
            }
            if(this.tareaNueva.fecha.limite == ""){
                this.tareaNueva.fecha.limite = `${año}-${mes}-${dia}`;
            }

            
            if(this.tareaNueva.usuarios.length < 1){
                this.tareaNueva.usuarios = [this.usuarioSelected.id];
            }

            this.formNuevo = !this.formNuevo;
        },
        toggleActualizaciones(tarea) {
            tarea.mostrarActualizaciones = !tarea.mostrarActualizaciones;
        },
        cerrarFormAñadir(accion){
                if(accion == "guardar"){
                    var control = "";
                    if(this.tareaNueva.usuarios.length < 1){
                        control += " Usuario ";
                    }
                    if(this.tareaNueva.asunto == ""){
                        control += " Asunto ";
                    }
                    if(this.tareaNueva.fecha.creacion == ""){
                        control += " Fecha ";
                    }
                    if(this.tareaNueva.fecha.limite == ""){
                        control += " Limite ";
                    }
            

                    if(control != ""){
                        alert("Los siguientes campos no pueden estar vacios:" + control);
                    }else{
                        // Obtener la fecha de hoy
                        const hoy = new Date();

                        // Obtener el día, mes y año
                        const dia = hoy.getDate(); // Día del mes (1-31)
                        const mes = hoy.getMonth() + 1; // Mes (0-11, +1 para obtener 1-12)
                        const año = hoy.getFullYear(); // Año (e.g., 2024)

                        var t = {
                            usuarios: this.tareaNueva.usuarios,
                            clienteID: 0,
                            clienteNombre: this.tareaNueva.clienteNombre,
                            asunto: this.tareaNueva.asunto,
                            fecha: this.tareaNueva.fecha,
                            prioridad: this.tareaNueva.prioridad,
                            estado: this.tareaNueva.estado,
                            recursividad: this.tareaNueva.recursividad,
                        };

                        if(t.clienteNombre == ""){
                            t.clienteNombre = "Ninguno";
                        }
                        
                        if(this.tareaNueva.id == -1){
                            if(this.tareaNueva_actualizaciones == ""){
                                t.actualizaciones = {
                                    1: {
                                        usuario: datosCliente().nombre,
                                        fecha: `${año}-${mes}-${dia}`,
                                        texto: "*No se ha añadido un registro inicial.*",
                                    }
                                }
                            }else{
                                t.actualizaciones = {
                                    1: {
                                        usuario: datosCliente().nombre,
                                        fecha: `${año}-${mes}-${dia}`,
                                        texto: this.tareaNueva_actualizaciones,
                                    }
                                }
                            }
                            this.subirTarea(t);
                        }else{
                            t.id = this.tareaNueva.id;
                            t.actualizaciones = this.tareaNueva.actualizaciones;
                            // console.log(t);
                            this.modificarTarea(t);
                        }
                        
                        this.formNuevo = false;
                        this.usuarioBoton = "Ninguno";
                        this.tareaNueva = JSON.parse(JSON.stringify(this.tareaModelo));
                        this.tareaNueva_actualizaciones = "";
                    }
                }

                if(accion == "cancelar"){
                    this.formNuevo = false;
                    this.usuarioBoton = "Ninguno";
                    this.tareaNueva = JSON.parse(JSON.stringify(this.tareaModelo));
                    this.tareaNueva_actualizaciones = "";
                }

        },
        async cambiarUsuarioSelected(){
            console.log(datosCliente().usuario);

            
            const docRef = doc(db, "usuarios", datosCliente().usuario);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                this.usuarioSelected = {
                        id: docSnap.id,
                        nombre: docSnap.data().nombre,
                        abreviatura: docSnap.data().abreviatura
                };
            } else {
                console.log("No se encontraron datos del usuario.");
            }
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },

        listenerTareas(){
            const colRef = collection(db, 'tareas');

            const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
                const t = [];

                querySnapshot.forEach((doc) => {
                    t.push({
                        id: doc.id,
                        ...doc.data(),
                        mostrarActualizaciones: false,
                        mostrarOpciones: false,
                        mostrarActualizacionesAñadir: false
                    })
                });

                this.tareas = t;
                this.aplicarFiltro();
                console.log(this.tareas);
            });

            return unsubscribe;
        },
        

        listenerUsuarios(){
            const colRef = collection(db, "usuarios");

            const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
                const u = [];

                querySnapshot.forEach((doc) => {
                    u.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                });

                this.usuarios = u;
                console.log(this.usuarios);
            });

            return unsubscribe;
        },
        

        listenerPrio(){
            const colRef = collection(db, "prioListTareas");

            const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
                const p = [];

                querySnapshot.forEach((doc) => {
                    p.push({
                        ...doc.data(),
                    })
                });

                this.prioList = p;
                console.log(this.prioList);
            });

            return unsubscribe;
        },
        

        listenerEstado(){
            const colRef = collection(db, "estadoListTareas");

            const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
                const e = [];

                querySnapshot.forEach((doc) => {
                    e.push({
                        ...doc.data(),
                    })
                });

                this.estadoList = e;
                console.log(this.estadoList);
            });

            return unsubscribe;
        },


        async subirTarea(tarea) {
            try {
                const colRef = collection(db, "tareas");
                const docRef = await addDoc(colRef, tarea);
                console.log(`Tarea creada con éxito, ID del documento: ${docRef.id}`);
            } catch (error) {
                console.error(`Error subiendo la tarea:`, error);
            }
        },
    },
    mounted() {
        const cancelarListenerTareas = this.listenerTareas();
        const cancelarListenerUsuarios = this.listenerUsuarios();
        const cancelarListenerPrio = this.listenerPrio();
        const cancelarListenerEstado = this.listenerEstado();
        this.cambiarUsuarioSelected();
    },
    created(){
    }
}
</script>

<style scoped>
</style>