import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const datosCliente = defineStore('datosCliente', () => {
  const nombre = ref(null)
  const usuario = ref(null)
  function cambiarNombre(val){
    nombre.value = val
  }
  function cambiarUsuario(val){
    usuario.value = val
  }

  return {nombre, usuario, cambiarNombre, cambiarUsuario}
})
