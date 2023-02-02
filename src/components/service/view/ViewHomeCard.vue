<template>
  <v-card v-if="!editScript">
    <v-card-title>
      Service Home
    </v-card-title>
    <v-card-text>
      {{serviceName}}
    </v-card-text>
    <v-card-text>
      {{serviceDescription}}
    </v-card-text>
    <v-card-text>
      {{serviceAddress}}
    </v-card-text>
    <v-card-text>
      {{servicePort}}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-pencil" @click="editScript = !editScript"></v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-if="editScript">
    <v-card-title>
      Edit Home
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="edit-home-form">
        <v-text-field label="Name" v-model="serviceName"></v-text-field>
        <v-textarea label="Description" v-model="serviceDescription"></v-textarea>
        <v-text-field label="Address" v-model="serviceAddress"></v-text-field>
        <v-text-field label="Port" v-model.number="servicePort" type="number"></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn type="submit" color="primary" form="edit-home-form">Save</v-btn>
      <v-btn color="primary" @click="editScript = !editScript">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang='ts'>
  import {onMounted, ref} from 'vue'
  import {useServiceStore} from "@/stores/service";

  const props = defineProps({
    id: Number,
  })

  const emit = defineEmits([
    'close'
  ])

  const service = useServiceStore();
  const editScript = ref(false)
  let serviceName = ref("")
  let serviceDescription = ref("")
  let serviceAddress = ref("")
  let servicePort = ref(0)
  let serviceTypeId = ref(0)
  let serviceCloudId = ref(0)

  onMounted(async () => {
    await service.fetchService(<number>props.id)
    serviceName.value = service.getName
    serviceDescription.value = service.getDescription
    serviceAddress.value = service.getAddress
    servicePort.value = service.getPort
    serviceTypeId.value = service.getServiceTypeId
    serviceCloudId.value = service.getCloudId
  })

  const onSubmit = () => {
    service.putService(serviceName.value, serviceDescription.value, serviceAddress.value, servicePort.value, serviceTypeId.value, serviceCloudId.value)
    editScript.value = false
  }
</script>
