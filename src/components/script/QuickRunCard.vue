<template>
  <v-card width="500px">
    <v-card-title>
      {{props.id}}
      {{props.title}}
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="run-script-form">
        {{props.code}}
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary" form="run-script-form">Run</v-btn>
      <v-btn color="primary" @click="$emit('close')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue'
  import {useScriptStore} from "@/stores/script";

  export default defineComponent({
    props: {
      id: Number,
      title: String,
      code: String
    },

    setup(props, context) {
      const script = useScriptStore();
      // const allScripts = useAllScriptsStore();

      const onSubmit = () => {
        console.log("Quick Run Card - Clicked on run button")
        script.runScript(<number>props.id)
        context.emit('close')
      }

      return {
        props,
        onSubmit,
      }
    },

    components: {
      // RunDialog
      // ScriptDialog,
    },

  })
</script>
