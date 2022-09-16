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
                        <td><b>Service Type</b></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                        <td>{{gettersService.service_type_name}}</td>
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
                  <v-btn @click="runService(gettersService)" flat>Quick Run</v-btn>
                </v-overlay>
              </v-card>
            </v-hover>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="viewService(gettersService)">Open</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-delete" @click="deleteService(gettersService)"></v-btn>
          </v-card-actions>

         </v-card>
      </v-col>

    </v-row>
  </v-container>

  <v-dialog v-model="quickRunDialog">
    <quick-run-card :id=getServiceById?.Id :title=getServiceById?.Name :code=getServiceById?.Code v-on:close="quickRunDialog = false" />
  </v-dialog>

  <v-dialog v-model="deleteDialog">
    <delete-card :id=getServiceById?.Id :title=getServiceById?.Name :description=getServiceById?.Description v-on:close="deleteDialog = false" />
  </v-dialog>

  <v-dialog v-model="viewDialog">
    <view-card :id=getServiceById?.Id v-on:close="viewDialog = false; allServices.fetchServices()" />
  </v-dialog>

</template>


<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import {onMounted, computed } from 'vue';
  import { useAllServicesStore } from '@/stores/allServices';
  import QuickRunCard from "@/components/script/QuickRunCard.vue";
  import AddCard from "@/components/service/AddCard.vue";
  import DeleteCard from "@/components/service/DeleteCard.vue";
  import ViewCard from "@/components/service/ViewCard.vue";

  export default defineComponent({
    setup() {
      const allServices = useAllServicesStore();

      const getServices = computed(() => {
        return allServices.getFilterServices
      })

      const getServiceById = computed(() => {
        return allServices.getServiceById(serviceId.value)
      })

      const quickRunDialog = ref(false)
      const deleteDialog = ref(false)
      const viewDialog = ref(false)
      const serviceId = ref(0)

      const runService = (gettersService: any) => {
        serviceId.value = gettersService.Id
        quickRunDialog.value = true
      }

      const deleteService = (gettersService: any) => {
        serviceId.value = gettersService.Id
        deleteDialog.value = true
      }

      const viewService = (gettersService: any) => {
        serviceId.value = gettersService.Id
        viewDialog.value = true
      }

      onMounted(async () => {
        await allServices.fetchServices()
      })

      return {
        allServices,
        getServices,
        getServiceById,
        runService,
        deleteService,
        viewService,
        quickRunDialog,
        deleteDialog,
        viewDialog,
        serviceId,
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
