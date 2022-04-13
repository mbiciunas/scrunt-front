<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Made By Getters</h1>
    <div v-for='gettersScript in getScripts' :key='gettersScript.id'>
      {{gettersScript.Id}} {{gettersScript.Name}} {{gettersScript.Script}}
    </div>
    <h1>Made By Actions</h1>
    <div v-for='script in scripts' :key='script.Id'>
      {{script.Id}} {{script.Name}} {{script.Script}}
    </div>
  </div>
</template>

<script lang='ts'>
  // <script setup>
  import { defineComponent } from 'vue'
  import {ref, onMounted, computed} from 'vue';
  import { useScriptStore } from '@/stores/script';

  export default defineComponent({
    setup() {
      const scripts = useScriptStore();

      const msg = ref("Welcome to my Scripts!!");

      const getScripts = computed(() => {
        // console.log(scripts.getScripts)
        return scripts.getScripts
      })

      onMounted(() => {
        scripts.fetchUsers();
      })

      return {
        msg,
        scripts,
        getScripts,
      }
    }
  })
</script>
