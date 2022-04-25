<template>
  <v-container fluid="fluid">
    <v-row justify="center">

      <v-col v-for="gettersScript in getScripts" :key="gettersScript.Id" cols="12" sm="12" md="6" lg="4" xl="3" xxl="2">
        <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="mx-auto"
            max-width="344"
            v-bind="props"
            dark>

          <v-tabs
              v-model="gettersScript.id"
              background-color="primary"
              density="compact"
          >
            <v-tab value="one">Home</v-tab>
            <v-tab value="two">Script</v-tab>
            <v-tab value="three">Output</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="gettersScript.id">
              <v-window-item value="one">
                {{gettersScript.Id}}
                {{gettersScript.Name}}
              </v-window-item>

              <v-window-item value="two">
                {{gettersScript.Script}}
              </v-window-item>

              <v-window-item value="three">
                Three
              </v-window-item>
            </v-window>

          </v-card-text>

          <v-overlay
              :model-value="isHovering"
              contained
              scrim="#339966"
              class="align-center justify-center"
          >
            <v-btn @click="greet(gettersScript)" flat>Quick Run</v-btn>

          </v-overlay>
        </v-card>
        </v-hover>
      </v-col>

    </v-row>
  </v-container>

  <v-btn
      color="blue"
      fab
      dark
      size="x-large"
      absolute
      bottom
      right
      @click="dialog = true"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>

<!--  <RunDialog/>-->
  <v-dialog
      v-model="dialog"
  >
    <quick-run-card :id=getScriptById.Id :title=getScriptById.Name :script=getScriptById.Script />
    <v-card>
      <v-card-text>
        {{getScriptById.Id}}
        {{getScriptById.Script}}
        {{scriptId}}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>



</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import {onMounted, computed } from 'vue';
  import { useScriptStore } from '@/stores/script';
  import QuickRunCard from "@/components/script/QuickRunCard.vue";

  export default defineComponent({
    setup() {
      const scripts = useScriptStore();

      const getScripts = computed(() => {
        return scripts.getScripts
      })

      const getScriptById = computed(() => {
        return scripts.getScriptById(scriptId.value)
      })

      let dialog = ref(false)
      let scriptId = ref(0)

      const greet = (gettersScript: any) => {
        scriptId.value = gettersScript.Id
        dialog.value = true
      }

      onMounted(() => {
        scripts.fetchScripts();
      })

      return {
        scripts,
        getScripts,
        getScriptById,
        greet,
        dialog,
        scriptId
      }
    },

    components: {
      QuickRunCard
      // ScriptDialog,
    },

  })
</script>
