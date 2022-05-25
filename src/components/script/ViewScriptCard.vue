<template>
  <v-card>
    <v-card-title>
      Script
    </v-card-title>
    <v-card-text>
      {{script.code}}
    </v-card-text>
  </v-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue'
  import { useAllScriptsStore } from '@/stores/allScripts';
import {useScriptStore} from "@/stores/script";

  export default defineComponent({
    props: {
      id: Number,
    },

    setup(props, context) {
      const script = useScriptStore();
      const tab = ref('home')

      onMounted(() => {
            console.log("Mounted id", props.id)
            script.fetchScript(<number>props.id)
            // scriptData = scripts.fetchScript(<number>props.id)
            console.log("Mounted scriptData", script.id)
      })

      // const onSubmit = () => {
      //   console.log("View Card - Clicked on run button")
      //   context.emit('close')
      // }

      return {
        props,
        script,
        tab,
      }
    },

    components: {
      // RunDialog
      // ScriptDialog,
    },

  })
</script>
