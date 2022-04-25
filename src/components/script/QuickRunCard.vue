<template>
  <v-card>
    <v-card-title>
      {{props.id}}
      {{props.title}}
    </v-card-title>
    <v-card-text>
      {{props.script}}
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import {computed } from 'vue';
import { useScriptStore } from '@/stores/script';

export default defineComponent({
  props: {
    id: Number,
    title: String,
    script: String
  },

  setup(props) {
    // const scripts = useScriptStore();

    // const getScripts = computed(() => {
    //   return scripts.getScripts
    // })

    // const getScriptById = computed(() => {
    //   return scripts.getScriptById(scriptId.value)
    // })

    // let dialog = ref(false)
    // let scriptId = ref(0)

    // const greet = (gettersScript: any) => {
    //   scriptId.value = gettersScript.Id
    //   dialog.value = true
    // }

    return {
      props
      // scripts,
      // getScripts,
      // getScriptById,
      // greet,
      // dialog,
      // scriptId
    }
  },

  components: {
    // RunDialog
    // ScriptDialog,
  },

})
</script>
