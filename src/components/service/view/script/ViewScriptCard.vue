<template>
  <v-card>
    <v-card-title>
      Scripts
    </v-card-title>

    <v-card-text>
      <v-table fixed-header height="300px">
        <thead>
          <tr>
            <th class="text-left">
              Script
            </th>
            <th class="text-left">
              Description
            </th>
            <th class="text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="scriptItem in serviceScripts" :key="scriptItem.ScriptId" >
            <EditScript :script-id="scriptItem.ScriptId" :name="scriptItem.ScriptName" :description="scriptItem.ScriptDescription" :service-id="serviceId"></EditScript>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang='ts'>
  import EditScript from "@/components/service/view/script/EditScript.vue";
  import { useServiceScriptStore } from "@/stores/serviceScripts";
  import { storeToRefs } from "pinia";

  const props = defineProps({
    serviceId: { type: Number, required: true },
  })

  const emit = defineEmits([
    'close'
  ])

  const serviceScriptStore = useServiceScriptStore();

  await serviceScriptStore.fetchServiceScripts(props.serviceId)

  const { serviceScripts } = storeToRefs(useServiceScriptStore());

  console.log("ViewScriptCard.setup - getServiceKeys", serviceScripts.value)
</script>
