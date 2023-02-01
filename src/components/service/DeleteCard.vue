<template>
  <v-card elevation="10">
    <v-card-title>
      Delete Service
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="delete-service-form">
          <v-text-field label="Name" v-model="props.title" disabled></v-text-field>
          <v-textarea label="Description" v-model="props.description" disabled></v-textarea>
          <v-checkbox
              v-model="deleteService"
              label="Confirm Delete"
          ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" form="delete-service-form" :disabled="!deleteService" >Delete Service</v-btn>
      <v-btn color="primary" @click="$emit('close')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang='ts'>
  import { ref } from 'vue'
  import { useAllServicesStore } from '@/stores/allServices';

  const props = defineProps({
    id: Number,
    title: String,
    description: String
  })

  const emit = defineEmits([
    'close'
  ])

  const allServices = useAllServicesStore();
  let deleteService = ref(false)

  const onSubmit = () => {
    allServices.deleteService(<number>props.id)
    emit('close')
  }
</script>
