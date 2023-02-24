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
<!--          <td>-->
<!--          {{ serviceKeys }}-->
<!--          {{ keyItem }}-->
<!--          ServiceKeyId: {{ keyItem[0].ServiceKeyId }} Name: {{ keyItem[0].KeyName }} Description: {{ keyItem[0].KeyDescription }} ServiceId: {{ serviceId }}-->
          <EditKey :service-key-id="keyItem.ServiceKeyId" :name="keyItem.KeyName" :description="keyItem.KeyDescription" :service-id="serviceId" :keys="keys"></EditKey>
<!--          </td>-->
        </tr>
        <tr>
          <td>
            <v-btn v-on:click="submitAdd" color="primary">Add</v-btn>
            <v-btn v-on:click="checkStuff" color="secondary">Check Stuff</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang='ts'>
import {reactive, ref} from 'vue'
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

  await serviceStore.fetchServiceKeys()
  const serviceKeys = reactive(serviceStore.getServiceKeys)
  // const serviceKeys = ref()
  // serviceKeys.value = serviceStore.getServiceKeys
  // const serviceKeys = serviceStore.getServiceKeys
  console.log("ViewKeyCard.setup - serviceKeys", serviceKeys)
  // const myServiceKeys = [
  //     {ServiceKeyId: 1, KeyId: 1, KeyName: 'RSA key', KeyDescription: 'RSA key for accessing database.'},
  //     {ServiceKeyId: 42, KeyId: 2, KeyName: 'DSA key', KeyDescription: 'This is another key.'}
  // ]
  // console.log("ViewKeyCard.setup - myServiceKeys", myServiceKeys)

  const submitAdd = async () => {
    await serviceStore.addServiceKey()
  }

  const checkStuff = async () => {
    console.log("ViewKeyCard.checkStuff - serviceKey", serviceKeys)
  }

</script>
