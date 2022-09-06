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
              label="Delete Service"
          ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" form="delete-service-form" :disabled="!deleteService" >Delete Service</v-btn>
      <v-btn color="primary" @click="$emit('close')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import { useAllServicesStore } from '@/stores/allServices';

  export default defineComponent({
    props: {
      id: Number,
      title: String,
      description: String
    },
    setup(props, context) {
      console.log("id", props.id)
      console.log("title", props.title)
      console.log("description", props.description)
      const allServices = useAllServicesStore();
      let deleteService = ref(false)

      const onSubmit = () => {
        allServices.deleteService(<number>props.id)
        context.emit('close')
      }

      return {
        props,
        deleteService,
        onSubmit,
      }
    },

  })
</script>
