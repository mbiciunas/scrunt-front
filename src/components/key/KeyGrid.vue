<template>
  <v-container fluid="fluid">
    <v-row justify="center">
      <v-col v-for="gettersKey in getKeys" :key="gettersKey.Id" cols="12" sm="12" md="6" lg="4" xl="3" xxl="2">
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
                  {{gettersKey.Id}}
                  {{gettersKey.Name}}
                </v-card-title>

                <v-card-text>
                  {{gettersKey.Description}}
                </v-card-text>

                <v-card-text>
                  <table>
                    <tbody>
                      <tr>
                        <td style="vertical-align:top;"><b>Services</b></td>
                        <td>&nbsp;&nbsp;&nbsp;</td>
                        <td>
                          <template v-for="service in gettersKey.services">
                            {{service.Name}}
                          </template>
                        </td>
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
                  <v-btn @click="runKey(gettersKey)" flat>Quick Run</v-btn>
                </v-overlay>
              </v-card>
            </v-hover>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="viewKey(gettersKey)">Open</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-delete" @click="deleteKey(gettersKey)"></v-btn>
          </v-card-actions>

         </v-card>
      </v-col>

    </v-row>
  </v-container>

  <v-dialog v-model="quickRunDialog">
    <quick-run-card :id=getKeyById?.Id :title=getKeyById?.Name :code=getKeyById?.Code v-on:close="quickRunDialog = false" />
  </v-dialog>

  <v-dialog v-model="deleteDialog">
    <delete-card :id=getKeyById?.Id :title=getKeyById?.Name :description=getKeyById?.Description v-on:close="deleteDialog = false" />
  </v-dialog>

  <v-dialog v-model="viewDialog">
    <view-card :id=getKeyById?.Id :name=getKeyById?.Name v-on:close="viewDialog = false; allKeys.fetchKeys()" />
  </v-dialog>

</template>


<script setup lang='ts'>
  import { ref } from 'vue'
  import { onMounted, computed } from 'vue';
  import { useAllKeysStore } from '@/stores/allKeys';
  import QuickRunCard from "@/components/script/QuickRunCard.vue";
  import DeleteCard from "@/components/key/DeleteCard.vue";
  import ViewCard from "@/components/key/view/ViewCard.vue";

    const allKeys = useAllKeysStore();

    const getKeys = computed(() => {
      return allKeys.getFilterKeys
    })

    const getKeyById = computed(() => {
      return allKeys.getKeyById(keyId.value)
    })

    const quickRunDialog = ref(false)
    const deleteDialog = ref(false)
    const viewDialog = ref(false)
    const keyId = ref(0)

    const runKey = (gettersService: any) => {
      keyId.value = gettersService.Id
      quickRunDialog.value = true
    }

    const deleteKey = (gettersService: any) => {
      keyId.value = gettersService.Id
      deleteDialog.value = true
    }

    const viewKey = (gettersService: any) => {
      keyId.value = gettersService.Id
      viewDialog.value = true
    }

    onMounted(async () => {
      await allKeys.fetchKeys()
    })
</script>
