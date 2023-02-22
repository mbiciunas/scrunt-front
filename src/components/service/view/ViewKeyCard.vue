<template>
  <v-card>
    <v-card-title>
      Keys
    </v-card-title>

    <v-card-text>
      <v-table fixed-header height="300px">
        <thead>
        <tr>
          <th class="text-left">
            Key
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
        <tr v-for="key in serviceKey" :key="key.ServiceKeyId" >
          <EditKey :service-key-id="key.ServiceKeyId" :name="key.KeyName" :description="key.KeyDescription" :service-id="serviceId" :keys="keys"></EditKey>
        </tr>
        <tr>
          <td>
            <v-btn v-on:click="submitAdd" color="primary">Add</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang='ts'>
  import { ref } from 'vue'
  import { useAllKeysStore } from "@/stores/allKeys";
  import EditKey from "@/components/service/view/EditKey.vue";
  import {useServiceStore} from "@/stores/service";

  export interface Key {
    Id: number
    Name: string
    Description: number
    key_type_id: number
    key_type_name: string
    services: Array<any>
  }

  const props = defineProps({
    serviceId: { type: Number, required: true },
  })

  const emit = defineEmits([
    'close'
  ])

  const allKeysStore = useAllKeysStore();
  const keys = ref()

  await allKeysStore.fetchKeys()
  keys.value = await allKeysStore.getKeys

  const serviceStore = useServiceStore();
  const serviceKey = ref()

  await serviceStore.fetchServiceKeys()
  serviceKey.value = serviceStore.getServiceKeys
  console.log("RequiredKeys.setup - serviceKey", serviceKey.value)

  const submitAdd = async () => {
    await serviceStore.addServiceKey()
  }

</script>
