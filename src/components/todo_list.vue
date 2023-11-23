<script setup>
</script>

<template>
    <div class="todo-box">
        <div class="header">
            <h3>To Do List</h3>
        </div>
        <ul class="todo-list">
            <li class="task">
            <span class="checkbox"></span>
            <p class="task-details">Llamar a Fulano...</p>
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
