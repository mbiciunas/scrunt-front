<template>
  <v-card>
    <v-card-title>
      One
    </v-card-title>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import { useAllScriptsStore } from '@/stores/allScripts';

  export default defineComponent({
    props: {
      id: Number,
      title: String,
      code: String
    },

    setup(props, context) {
      const allScripts = useAllScriptsStore();
      const tab = ref('home')

      const onSubmit = () => {
        console.log("View Card - Clicked on run button")
        allScripts.runScript(<number>props.id)
        context.emit('close')
      }

      return {
        props,
        onSubmit,
        tab,
      }
    },

    components: {
      // RunDialog
      // ScriptDialog,
    },

  })
</script>
