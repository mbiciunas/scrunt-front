<template>
  <v-row>
    <v-col>
    <v-select
        v-model="selectedServiceTypes"
        :items="serviceTypes"
        item-title="Name"
        item-value="Id"
        label="Required Service"
        hint="This is a hint"
    ></v-select>
    </v-col>
    <v-col>
    <v-text-field
        label="Unique Name"
        v-model="description"
        type="input"
        hint="Valid python names only, no spaces"
    ></v-text-field>
    </v-col>
  </v-row>
</template>

<script lang='ts'>
import {defineComponent, computed, ref, onMounted, toRefs} from 'vue'
import {useAllServicesStore} from "@/stores/allServices";

export default defineComponent({
  props: {
    initialDescription: String
  },
  emits: ['update:modelValue'],
  setup: function (props) {
    const allServicesStore = useAllServicesStore();
    const selectedServiceTypes = ref({Id: '', Name: '', Icon: ''})
    const description = ref(props.initialDescription)

    const serviceTypes = ref()
    console.log("Setup", serviceTypes)

    onMounted(async () => {
      await allServicesStore.fetchServiceTypes()
      serviceTypes.value = await allServicesStore.getServiceTypes
      await console.log("serviceTypes1: ", serviceTypes)
    })

    console.log("Setup after onMounted", serviceTypes)
    return {
      serviceTypes,
      selectedServiceTypes,
      description,
    }
  },
})
</script>
