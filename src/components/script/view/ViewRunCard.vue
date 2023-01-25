<style scoped>
  .v-card-text_scroll {
    flex-grow: 1;
    overflow: auto;
  }
</style>

<template>
  <div class="d-flex flex-grow-1 flex-shrink-0" style="background-color: lightyellow;">
    <v-tabs
        v-model="tab"
        direction="vertical"
        bg-color="secondary"
        class="flex-shrink-0"
    >
      <v-tab value="option-1">
        <v-icon start>
          mdi-account
        </v-icon>
        Setup
      </v-tab>
      <v-tab value="option-2">
        <v-icon start>
          mdi-lock
        </v-icon>
        Run
      </v-tab>
      <v-tab value="option-3">
        <v-icon start>
          mdi-access-point
        </v-icon>
        Error
      </v-tab>
    </v-tabs>
    <v-window v-model="tab" class="d-flex flex-grow-1 flex-shrink-0" style="color: lightsalmon;">
      <v-window-item value="option-1" selected-class="d-flex flex-grow-1 flex-shrink-0">
        <v-card flat class="d-flex flex-grow-1 flex-shrink-0  flex-column">
          <v-card-text class="d-flex flex-grow-1 flex-shrink-0">
            <RunService v-model="newScriptService"  v-model:service-types="serviceTypes"></RunService>
          </v-card-text>
          <v-card-text>
            <v-btn v-on:click="runScript" color="primary">Run</v-btn>
          </v-card-text>
        </v-card>
      </v-window-item>
      <v-window-item value="option-2" selected-class="d-flex flex-grow-1 flex-shrink-0">
        <v-card flat>
          <v-card-text>
            <p>Put script output here...</p>
          </v-card-text>
        </v-card>
      </v-window-item>
      <v-window-item value="option-3" selected-class="d-flex flex-grow-1 flex-shrink-0">
        <v-card class="grow" height="100%" style="position: relative">
          <v-card-text class="v-card-text_scroll" style="background:#aeaeae; height:70%">
            <pre>{{scriptCode}}</pre>
          </v-card-text>

          <v-card-actions>
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
          </v-card-actions>
        </v-card>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang='ts'>
  import {ref} from 'vue'
  import {useScriptStore} from "@/stores/script";
  import {useOutputStore} from "@/stores/outputs";
  import RunService from "@/components/script/view/RunServices.vue";
  import {useAllServicesStore} from "@/stores/allServices";
  import type {ScriptServiceTypes} from "@/stores/script";

  const props = defineProps(
      {id: Number}
  )

  const emit = defineEmits(
      ['close', 'setOutput']
  )

  const tab = ref("option-1")

  const output = useOutputStore();

  // const testModel = ref([])

  let scriptCode = ref("")

  let modelLogLevel = ref([20,50])

  const tickLabels = {
    10: 'Debug',
    20: 'Info',
    30: 'Warning',
    40: 'Error',
    50: 'Critical',
  }

  // Get the script from the script store
  const scriptStore = useScriptStore();
  await scriptStore.fetchScript(<number>props.id)
  await scriptStore.fetchScriptServices()
  const scriptService = scriptStore.getScriptService

  // Get service types from the all services store
  const allServicesStore = useAllServicesStore();
  await allServicesStore.fetchServiceTypes()
  const serviceTypes = await allServicesStore.getServiceTypes

  // Get the services from the all services store
  // const allServicesStore = useAllServicesStore();
  await allServicesStore.fetchServices()

  const newScriptService = ref(scriptService.map((scriptServiceTypes: ScriptServiceTypes) => ({
    Id: scriptServiceTypes.Id,
    Name: scriptServiceTypes.Name,
    ServiceTypeId: scriptServiceTypes.ServiceTypeId,
    SelectedValue: null,
    Services: allServicesStore.getServiceByType(scriptServiceTypes.ServiceTypeId)
  })))

  const addOutput = async () => {
    await output.fetchOutputs(scriptStore.getRunId, 0)

    for (const value of output.getOutputs) {
      if (value.OutputType >= modelLogLevel.value[0] && value.OutputType <= modelLogLevel.value[1]) {
        scriptCode.value += value.OutputValue + "\n"
      }
    }
  }

  const runScript = async () => {
    console.log("ViewRunCard.runScript - newScriptService: ", newScriptService.value)
    scriptCode.value = ""
    await scriptStore.runScript(<number>props.id)

    await addOutput()
  }

  const logLevelChange = () => {
    console.log("LogLevelChange", modelLogLevel)
    scriptCode.value = ""
    addOutput()
  }
</script>
