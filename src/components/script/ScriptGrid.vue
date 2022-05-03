<template>
  <v-container fluid="fluid">
    <v-row justify="center">

      <v-col v-for="gettersScript in getScripts" :key="gettersScript.Id" cols="12" sm="12" md="6" lg="4" xl="3" xxl="2">
        <v-card
            class="mx-auto"
            max-width="344"
            dark>

          <v-card-text>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                  class="mx-auto"
                  max-width="344"
                  v-bind="props"
                  dark>

                <v-card-title>
                  {{gettersScript.Id}}
                  {{gettersScript.Name}}
                </v-card-title>

                <v-card-text>
                  {{gettersScript.Code}}
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
          </v-card-text>



         </v-card>
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
      @click="addDialog = true"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>

  <v-dialog v-model="quickRunDialog">
    <quick-run-card :id=getScriptById.Id :title=getScriptById.Name :code=getScriptById.Code v-on:close="quickRunDialog = false" />
  </v-dialog>

  <v-dialog v-model="addDialog">
    <add-card v-on:close="addDialog = false" />
  </v-dialog>



</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import {onMounted, computed } from 'vue';
  import { useScriptStore } from '@/stores/script';
  import QuickRunCard from "@/components/script/QuickRunCard.vue";
  import AddCard from "@/components/script/AddCard.vue";

  export default defineComponent({
    setup() {
      const scripts = useScriptStore();

      const getScripts = computed(() => {
        return scripts.getScripts
      })

      const getScriptById = computed(() => {
        return scripts.getScriptById(scriptId.value)
      })

      let quickRunDialog = ref(false)
      let addDialog = ref(false)
      let scriptId = ref(0)

      const greet = (gettersScript: any) => {
        scriptId.value = gettersScript.Id
        quickRunDialog.value = true
      }

      onMounted(() => {
        scripts.fetchScripts();
      })

      return {
        scripts,
        getScripts,
        getScriptById,
        greet,
        quickRunDialog,
        addDialog,
        scriptId,
      }
    },

    components: {
      QuickRunCard,
      AddCard
    },

  })
</script>
