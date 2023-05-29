<script setup>
import WelcomeItem from './WelcomeItem.vue'
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
    <div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 0
        }
    },
    watch: {
        count: function(){

        },
    },
    methods: {
        increment() {
            this.count++
        }
    },
    mounted() {
        // methods can be called in lifecycle hooks, or other methods!
        this.increment()
    },
    created(){

    }
}
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>
