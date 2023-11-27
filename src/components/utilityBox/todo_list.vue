<script setup>
</script>

<template>
    <div class="todo-box">
        <div class="header">
            <h3>Tareas</h3>
        </div>
        <ul class="todo-list">
            <li class="task" id="borrar">
            <span class="checkbox">
                <div class="cortinaCont">
                    <div class="cortina"></div>
                </div> 
                <div class="tick1">
                </div>
                <div class="tick2">
                </div>
            </span>
            <p class="task-details">Llamar a Fulano... <div class="tachar"></div></p>
            <span class="priority high"></span>
            </li>
            <li class="task">
            <span class="checkbox"></span>
            <p class="task-details">Tramitar modelo X...</p>
            <span class="priority normal"></span>
            </li>
            <li class="task">
            <span class="checkbox"></span>
            <p class="task-details">Comprar pilas...</p>
            <span class="priority low"></span>
            </li>
            <li class="task">
            <span class="checkbox"></span>
            <p class="task-details">Mandar correo a...</p>
            <span class="priority low"></span>
            </li>
            <!-- Repetir para más tareas -->
        </ul>
    </div>
</template>

<style scoped>
</style>
