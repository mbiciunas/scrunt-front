<template>
  <v-card>
    <v-card-title>
      Run Code
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="run-script-form">
        <v-textarea label="Code" v-model="scriptCode"></v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn type="submit" color="primary" form="run-script-form">Run</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue'
import {useScriptStore} from "@/stores/script";

export default defineComponent({
  props: {
    id: Number,
  },

  emits: ["close", "setOutput"],
  setup(props, context) {
    const script = useScriptStore();
    let scriptCode = ref("")

    onMounted(async () => {
      console.log("onMounted props.id", props.id)
      await script.fetchScript(<number>props.id)
      scriptCode.value = script.getCode
      console.log("onMounted script.getId", script.getId)
      console.log("onMounted script.getCode", script.getCode)
    })

    const onSubmit = () => {
      console.log("View Run Card - Clicked on run button")
      script.runScript(<number>props.id)
      context.emit("setOutput")
      // script.putOutput(<number>props.id, "This is the output", "This is the log")
    }

    return {
      scriptCode,
      onSubmit,
    }
  },

  components: {
    // RunDialog
    // ScriptDialog,
  },

})
</script>
