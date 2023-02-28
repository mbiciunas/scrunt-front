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
        <tr v-for="keyItem in serviceKeys" :key="keyItem.ServiceKeyId" >
          <EditKey :service-key-id="keyItem.ServiceKeyId" :name="keyItem.KeyName" :description="keyItem.KeyDescription" :service-id="serviceId" :keys="keys"></EditKey>
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
  import {ref} from 'vue'
    import { useAllKeysStore } from "@/stores/allKeys";
    import EditKey from "@/components/service/view/key/EditKey.vue";
    import { useServiceStore } from "@/stores/service";
    import { storeToRefs } from "pinia";

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

  await serviceStore.fetchServiceKeys()

  const { serviceKeys } = storeToRefs(useServiceStore());

  console.log("ViewKeyCard.setup - getServiceKeys", serviceKeys)

  const submitAdd = async () => {
    await serviceStore.addServiceKey()
  }
</script>
