<template>
  <v-select
      v-model="selectedServices"
      :items="services"
      item-title="Name"
      item-value="Id"
      chips
      label="Service Types"
      multiple
  >
    <template v-slot:prepend-item>
      <v-list-item
          title="Select All"
          @click="toggle"
      >
        <template v-slot:prepend>
          <v-checkbox-btn
              :color="someServices ? 'indigo-darken-4' : undefined"
              :indeterminate="someServices && !allServices"
              :model-value="someServices"
          ></v-checkbox-btn>
        </template>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:selection>class="bg-green"</template>
  </v-select>
</template>

<script lang='ts'>
import {defineComponent, computed, ref, onMounted} from 'vue'
import {useServiceTypeStore} from "@/stores/serviceTypes";

export default defineComponent({
  setup: function () {
    const serviceTypes = useServiceTypeStore();
    const services = ref()
    // let services: string | any[] = [
    //   // { Id: 1, Name: 'Florida', Icon: '' },
    //   // { Id: 2, Name: 'Georgia', Icon: '' },
    //   // { Id: 3, Name: 'Nebraska', Icon: '' },
    //   // { Id: 4, Name: 'California', Icon: '' },
    //   // { Id: 5, Name: 'New York', Icon: '' },
    // ]

    // onMounted(() => {
    //   serviceTypes.fetchServiceTypes();
    // })

    onMounted(async () => {
      await serviceTypes.fetchServiceTypes()
      services.value = serviceTypes.getServiceTypes
      console.log("Service Types", services)
    })

    let selectedServices = ref([])

    const allServices = computed(() =>
        selectedServices.value.length === services.value.length
    )

    const someServices = computed(() =>
        selectedServices.value.length > 0
    )

    function toggle() {
      if (allServices.value) {
        selectedServices.value = []
      } else {
        selectedServices.value = services.value.slice() as any
      }
    }

    return {
      allServices,
      someServices,
      toggle,
      services,
      selectedServices,
    }
  },
})
</script>
