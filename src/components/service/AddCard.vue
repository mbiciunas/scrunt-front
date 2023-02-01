<template>
  <v-card>
    <v-card-title>
      Add Service
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="add-service-form">
        <v-select
            label="Service Types"
            v-model="serviceType"
            :items="serviceTypes"
            item-title="Name"
            item-value="Id"
        ></v-select>

        <v-text-field label="Name" v-model="serviceName"></v-text-field>
        <v-textarea label="Description" v-model="serviceDescription"></v-textarea>
        <v-text-field label="Address" v-model="serviceAddress"></v-text-field>
        <v-text-field label="Port" type="number" v-model.number="servicePort"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary" form="add-service-form">Add Service</v-btn>
      <v-btn color="primary" @click="$emit('close')">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang='ts'>
  import { ref } from 'vue'
  import {useAllServicesStore} from "@/stores/allServices";

  const emit = defineEmits([
      'close'
  ])

  const allServicesStore = useAllServicesStore();
  await allServicesStore.fetchServiceTypes()
  const serviceTypes = allServicesStore.getServiceTypes

  const allServices = useAllServicesStore();
  let serviceType = ref(0)
  let serviceName = ref("")
  let serviceDescription = ref("")
  let serviceAddress = ref("")
  let servicePort = ref(0)

  const onSubmit = () => {
    allServices.postServices(serviceName.value, serviceDescription.value, serviceAddress.value, servicePort.value, serviceType.value)
    emit('close')
  }
</script>
