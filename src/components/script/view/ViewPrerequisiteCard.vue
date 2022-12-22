<template>
  <v-card>
    <v-card-title>
      Required Services
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="edit-home-form">
        <RequiredService initial-description="scriptName1"  :service-types="serviceTypes"></RequiredService>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn type="submit" color="primary" form="edit-home-form">Save</v-btn>
      <v-btn color="primary">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang='ts'>
  import {ref} from 'vue'
  import RequiredService from "@/components/script/view/RequiredServices.vue";
  import {useAllServicesStore} from "@/stores/allServices";

  const props = defineProps(
      {id: Number}
  )

  const emit = defineEmits(
      ['close']
  )

  const allServicesStore = useAllServicesStore();
  const serviceTypes = ref()

  await allServicesStore.fetchServiceTypes()
  serviceTypes.value = await allServicesStore.getServiceTypes

  const onSubmit = () => {
    console.log("RequiredServices.onSubmit - scriptService")
    // script.putNameDescription(scriptName.value, scriptDescription.value)
  }
</script>
