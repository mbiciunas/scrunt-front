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
import {useCloudStore} from "@/stores/clouds";
import {useAllServicesStore} from "@/stores/allServices";

export default defineComponent({
  setup: function () {
    // const cloudStore = useCloudStore();
    const allSerivces = useAllServicesStore();
    const {clouds, selectedClouds} = toRefs(allSerivces)
    // const clouds = ref()
    // const clouds: Array<string> = [
    //   'AWS',
    //   'On Premise',
    // ]

    onMounted(async () => {
      await allSerivces.fetchClouds()
      // clouds.value = allSerivces.getClouds
      // console.log("Clouds", clouds)
    })

    // let selectedClouds = ref([])

    const allClouds = computed(() =>
        selectedClouds.value.length === clouds.value.length
    )

    const someClouds = computed(() =>
        selectedClouds.value.length > 0
    )

    function toggle() {
      console.log("CloudSelect.toggle1", allClouds.value, selectedClouds)
      if (allClouds.value) {
        selectedClouds.value = []
      } else {
        console.log("CloudSelect.toggle2", clouds.value.map(({Id}) => Id))
        // selectedClouds.value = clouds.value.slice() as any
        selectedClouds.value = clouds.value.map(({Id}) => Id)
      }
      console.log(allClouds.value, selectedClouds)
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
