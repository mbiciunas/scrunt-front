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
                  flat>

                <v-card-title>
                  {{gettersScript.Name}}
                </v-card-title>

                <v-card-text>
                  {{gettersScript.Description}}
                </v-card-text>

                <v-card-text>
                  {{gettersScript.Code}}
                </v-card-text>

                <v-overlay
                    :model-value="isHovering"
                    contained
                    scrim="#339966"
                    class="align-center justify-center"
                >
                  <v-btn @click="runScript(gettersScript)" flat>Quick Run</v-btn>
                </v-overlay>
              </v-card>
            </v-hover>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" @click="viewScript(gettersScript)">Open</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-delete" @click="deleteScript(gettersScript)"></v-btn>
          </v-card-actions>

         </v-card>
      </v-col>

    </v-row>
  </v-container>

  <v-dialog v-model="quickRunDialog">
    <quick-run-card :id=getScriptById?.Id :title=getScriptById?.Name :code=getScriptById?.Code v-on:close="quickRunDialog = false" />
  </v-dialog>

  <v-dialog v-model="deleteDialog">
    <delete-card :id=getScriptById?.Id :title=getScriptById?.Name :description=getScriptById?.Description v-on:close="deleteDialog = false" />
  </v-dialog>

  <v-dialog v-model="viewDialog">
    <view-card :id=getScriptById?.Id :name=getScriptById?.Name v-on:close="viewDialog = false; allScripts.fetchScripts()" />
  </v-dialog>

</template>


<script setup lang='ts'>
  import {ref} from 'vue'
  import {onMounted, computed} from 'vue';
  import {useAllScriptsStore} from '@/stores/allScripts';
  import QuickRunCard from "@/components/script/QuickRunCard.vue";
  import DeleteCard from "@/components/script/DeleteCard.vue";
  import ViewCard from "@/components/script/view/ViewCard.vue";

  const allScripts = useAllScriptsStore();

  const getScripts = computed(() => {
    return allScripts.getScripts
  })

  const getScriptById = computed(() => {
    return allScripts.getScriptById(scriptId.value)
  })

  const quickRunDialog = ref(false)
  const deleteDialog = ref(false)
  const viewDialog = ref(false)
  const scriptId = ref(0)

  const runScript = (gettersScript: any) => {
    scriptId.value = gettersScript.Id
    quickRunDialog.value = true
  }

  const deleteScript = (gettersScript: any) => {
    scriptId.value = gettersScript.Id
    deleteDialog.value = true
  }

  const viewScript = (gettersScript: any) => {
    scriptId.value = gettersScript.Id
    viewDialog.value = true
  }

  onMounted(() => {
    allScripts.fetchScripts();
  })
</script>
