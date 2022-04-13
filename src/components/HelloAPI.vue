<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Made By Getters</h1>
    <div v-for='gettersScript in getScripts' :key='gettersScript.id'>
      {{gettersScript.id}} {{gettersScript.name}} {{gettersScript.script}}
    </div>
    <h1>Made By Actions</h1>
    <div v-for='script in scripts' :key='user.id'>
      {{script.id}} {{script.name}} {{script.script}}
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
      const script = useScriptStore();

      const msg = ref("Welcome to my Scripts");

      const getScripts = computed(() => {
        return script.getScripts
      })
    }
  })
  onMounted(() => {
    script.fetchUsers();
  })
</script>
