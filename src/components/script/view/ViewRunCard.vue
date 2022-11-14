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
  <v-card height="400px">
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

    <v-card-actions>
<!--      <v-btn type="submit" color="primary" form="run-script-form">Run</v-btn>-->
<!--      <v-spacer></v-spacer>-->
      <v-range-slider
          v-model="modelLogLevel"
          :ticks="tickLabels"
          :min="10"
          :max="50"
          step="10"
          show-ticks="always"
          tick-size="4"
          v-on:click="logLevelChange"
      ></v-range-slider>
<!--      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>-->
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref, type Ref} from 'vue'
import {useScriptStore} from "@/stores/script";
import {useOutputStore} from "@/stores/outputs";

export default defineComponent({
  props: {
    id: Number,
  },

  emits: ["close", "setOutput"],
  setup(props) {
    const script = useScriptStore();
    const output = useOutputStore();

    let scriptCode = ref("")

    let modelLogLevel = ref([20,50])

    const tickLabels = {
      10: 'Debug',
      20: 'Info',
      30: 'Warning',
      40: 'Error',
      50: 'Critical',
    }

    onMounted(async () => {
      console.log("onMounted props.id", props.id)
      await script.fetchScript(<number>props.id)
      // scriptCode.value = script.getCode
      console.log("onMounted script.getId", script.getId)
      console.log("onMounted script.getCode", script.getCode)
    })

    const addOutput = async () => {
      console.log("View Run Card - addOutput", script.getRunId)
      // await output.fetchOutputs(<number>props.id, script.getRunId)
      await output.fetchOutputs(script.getRunId, 0)
      console.log("After fetchOutputs", output.getOutputs)

      for (const value of output.getOutputs) {
        console.log("value.OutputType: ", value.OutputType, "  modelLogLevel.value[0]: ", modelLogLevel.value[0])
        if (value.OutputType >= modelLogLevel.value[0] && value.OutputType <= modelLogLevel.value[1]) {
          console.log("Display the Element!!!", value.OutputValue)
          scriptCode.value += value.OutputValue + "\n"
        }
      }
      // scriptCode.value = output.getOutputs
      // scriptCode.value += "\nTis is a new line\n"
    }

    const runScript = async () => {
      console.log("View Run Card - Clicked on run button")
      scriptCode.value = ""
      await script.runScript(<number>props.id)
      await console.log("ViewRunCard.runScript - getRunId", script.getRunId)
      // context.emit("setOutput")
      // script.putOutput(<number>props.id, "This is the output", "This is the log")

      // setInterval(addOutput, 1000)
      await addOutput()
    }

    const logLevelChange = () => {
      console.log("LogLevelChange", modelLogLevel)
      scriptCode.value = ""
      addOutput()
    }
    return {
      scriptCode,
      runScript,
      modelLogLevel,
      tickLabels,
      logLevelChange
    }
  },

  components: {
    // RunDialog
    // ScriptDialog,
  },

})
</script>
