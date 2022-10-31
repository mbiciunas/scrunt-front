<template>
  <v-select
      v-model="selectedClouds"
      :items="clouds"
      item-title="Name"
      item-value="Id"
      chips
      label="Clouds"
      multiple
  >
    <template v-slot:prepend-item>
      <v-list-item
          title="Select All"
          @click="toggle"
      >
        <template v-slot:prepend>
          <v-checkbox-btn
              :color="someClouds ? 'indigo-darken-4' : undefined"
              :indeterminate="someClouds && !allClouds"
              :model-value="someClouds"
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
    const allServices = useAllServicesStore();
    const {clouds, selectedClouds} = toRefs(allServices)

    onMounted(async () => {
      await allServices.fetchClouds()
    })

    const allClouds = computed(() =>
        selectedClouds.value.length === clouds.value.length
    )

    const someClouds = computed(() =>
        selectedClouds.value.length > 0
    )

    function toggle() {
      if (allClouds.value) {
        selectedClouds.value = []
      } else {
        selectedClouds.value = clouds.value.map(({Id}) => Id)
      }
    }

    return {
      allClouds,
      someClouds,
      toggle,
      clouds,
      selectedClouds,
    }
  },
})
</script>
