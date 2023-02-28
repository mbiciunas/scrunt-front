<template>
  <v-card>
    <v-card-title>
      Services
      Services
    </v-card-title>

    <v-card-text>
      <v-table fixed-header height="300px">
        <thead>
        <tr>
          <th class="text-left">
            Service
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
        <tr v-for="serviceItem in keyServices" :key="serviceItem.ServiceKeyId" >
          <EditService :service-key-id="serviceItem.ServiceKeyId" :name="serviceItem.ServiceName" :description="serviceItem.ServiceDescription" :key-id="keyId" :services="services"></EditService>
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
    import { useAllServicesStore } from "@/stores/allServices";
    import EditService from "@/components/key/view/service/EditService.vue";
    import { useKeyStore } from "@/stores/key";
    import { storeToRefs } from "pinia";

  export interface Service {
    Id: number
    Name: string
    Description: number
    service_type_id: number
    service_type_name: string
    services: Array<any>
  }

  const props = defineProps({
    keyId: { type: Number, required: true },
  })

  const emit = defineEmits([
    'close'
  ])

  const allServicesStore = useAllServicesStore();
  const services = ref()

  await allServicesStore.fetchServices()
  services.value = await allServicesStore.getServices

  const keyStore = useKeyStore();

  await keyStore.fetchKeyServices()

  const { keyServices } = storeToRefs(useKeyStore());

  console.log("ViewServiceCard.setup - keyServices", keyServices)

  const submitAdd = async () => {
    await serviceStore.addServiceKey()
  }
</script>
