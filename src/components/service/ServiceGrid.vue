<template>
  <v-container fluid="fluid">
    <v-row justify="center">
      <v-col v-for="gettersService in getServices" :key="gettersService.Id" cols="12" sm="12" md="6" lg="4" xl="3" xxl="2">
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
                  {{gettersService.Id}}
                  {{gettersService.Name}}
                </v-card-title>

                <v-card-text>
                  {{gettersService.Description}}
                </v-card-text>

                <v-card-text>
                  <table>
                    <tbody>
                      <tr>
                        <td><b>Host</b></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                        <td>{{gettersService.address}}</td>
                      </tr>
                      <tr>
                        <td><b>Cloud</b></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                        <td>{{gettersService.cloud_name}}</td>
                      </tr>
                      <tr>
                        <td><b>Project</b></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                        <td>{{gettersService.cloud_name}}</td>
                      </tr>
                    </tbody>
                  </table>
                </v-card-text>

                <v-overlay
                    :model-value="isHovering"
                    contained
                    scrim="#339966"
                    class="align-center justify-center"
                >
                  <v-btn @click="runScript(gettersService)" flat>Quick Run</v-btn>
                </v-overlay>
              </v-card>
            </v-hover>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="viewScript(gettersService)">Open</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-delete" @click="deleteScript(gettersService)"></v-btn>
          </v-card-actions>

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
    <quick-run-card :id=getScriptById?.Id :title=getScriptById?.Name :code=getScriptById?.Code v-on:close="quickRunDialog = false" />
  </v-dialog>

  <v-dialog v-model="addDialog">
    <add-card v-on:close="addDialog = false" />
  </v-dialog>

  <v-dialog v-model="deleteDialog">
    <delete-card :id=getScriptById?.Id :title=getScriptById?.Name :description=getScriptById?.Description v-on:close="deleteDialog = false" />
  </v-dialog>

  <v-dialog v-model="viewDialog">
    <view-card :id=getScriptById?.Id v-on:close="viewDialog = false; allServices.fetchServices()" />
  </v-dialog>

</template>


<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import {onMounted, computed } from 'vue';
  import { useAllServicesStore } from '@/stores/allServices';
  import QuickRunCard from "@/components/script/QuickRunCard.vue";
  import AddCard from "@/components/script/AddCard.vue";
  import DeleteCard from "@/components/script/DeleteCard.vue";
  import ViewCard from "@/components/script/ViewCard.vue";

  export default defineComponent({
    setup() {
      const allServices = useAllServicesStore();

      const getServices = computed(() => {
        return allServices.getServices
      })

      const getScriptById = computed(() => {
        return allServices.getServiceById(scriptId.value)
      })

      const quickRunDialog = ref(false)
      const addDialog = ref(false)
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
        allServices.fetchServices();
      })

      return {
        allServices,
        getServices,
        getScriptById,
        runScript,
        deleteScript,
        viewScript,
        quickRunDialog,
        addDialog,
        deleteDialog,
        viewDialog,
        scriptId,
      }
    },

    components: {
      QuickRunCard,
      AddCard,
      DeleteCard,
      ViewCard,
    },

  })
</script>
