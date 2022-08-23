<style scoped>
  html {
    /*overflow: hidden !important;*/
  }

  .v-card {
    display: flex !important;
    flex-direction: column;
  }

  .v-card-text_scroll {
    flex-grow: 1;
    overflow: auto;
  }
</style>

<template>
  <v-card height="300px">
    <v-card-title>
      Run Code
    </v-card-title>

    <v-card-text>
      <!--      <v-form @submit.prevent="onSubmit" id="run-script-form">-->
      <!--        <v-textarea label="Code" v-model="scriptCode"></v-textarea>-->
      <!--      </v-form>-->
      <v-btn v-on:click="runScript" color="primary">Run</v-btn>
    </v-card-text>

    <v-card-text class="v-card-text_scroll">
      <pre>{{scriptCode}}</pre>
<!--      <v-sheet color="green lighten-3" height="300"><pre>{{scriptCode}}</pre></v-sheet>-->
<!--      <pre height="200" class="height: 200px;">{{scriptCode}}</pre>-->
    </v-card-text>

<!--    <v-card-actions>-->
<!--&lt;!&ndash;      <v-btn type="submit" color="primary" form="run-script-form">Run</v-btn>&ndash;&gt;-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>-->
<!--    </v-card-actions>-->
  </v-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue'
import {useScriptStore} from "@/stores/script";
import {useOutputStore} from "@/stores/outputs";

export default defineComponent({
  props: {
    id: Number,
  },

  emits: ["close", "setOutput"],
  setup(props, context) {
    const script = useScriptStore();
    const output = useOutputStore();

    let scriptCode = ref("")

    onMounted(async () => {
      console.log("onMounted props.id", props.id)
      await script.fetchScript(<number>props.id)
      // scriptCode.value = script.getCode
      console.log("onMounted script.getId", script.getId)
      console.log("onMounted script.getCode", script.getCode)
    })

    const addOutput = async () => {
      console.log("View Run Card - addOutput")
      await output.fetchOutputs(<number>props.id, 0)

      for (const value of output.getOutputs) {
        scriptCode.value += value.OutputValue + "\n"
      }
      // scriptCode.value = output.getOutputs
      // scriptCode.value += "\nTis is a new line\n"
    }

    const runScript = () => {
      console.log("View Run Card - Clicked on run button")
      scriptCode.value = ""
      script.runScript(<number>props.id)
      // context.emit("setOutput")
      // script.putOutput(<number>props.id, "This is the output", "This is the log")

      // setInterval(addOutput, 1000)
      addOutput()
    }

    return {
      scriptCode,
      runScript,
    }
  },

  components: {
    // RunDialog
    // ScriptDialog,
  },

})
</script>
