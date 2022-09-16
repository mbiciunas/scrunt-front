<template>
  <v-select
      v-model="selectedServiceTypes"
      :items="serviceTypes"
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
  </v-select>
</template>

<script lang='ts'>
import {defineComponent, computed, ref, onMounted, toRefs} from 'vue'
import {useAllServicesStore} from "@/stores/allServices";

export default defineComponent({
  setup: function () {
    const allSerivces = useAllServicesStore();
    const {serviceTypes, selectedServiceTypes} = toRefs(allSerivces)

    onMounted(async () => {
      await allSerivces.fetchServiceTypes()
    })

    const allServices = computed(() =>
        selectedServiceTypes.value.length === serviceTypes.value.length
    )

    const someServices = computed(() =>
        selectedServiceTypes.value.length > 0
    )

    function toggle() {
      if (allServices.value) {
        selectedServiceTypes.value = []
      } else {
        selectedServiceTypes.value = serviceTypes.value.map(({Id}) => Id)
      }
    }

    return {
      allServices,
      someServices,
      toggle,
      serviceTypes,
      selectedServiceTypes,
    }
  },
})
</script>
