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
import {defineComponent, computed, ref, onMounted} from 'vue'
import {useCloudStore} from "@/stores/clouds";

export default defineComponent({
  setup() {
    const cloudStore = useCloudStore();
    const clouds = ref()
    // const clouds: Array<string> = [
    //   'AWS',
    //   'On Premise',
    // ]

    onMounted(async () => {
      await cloudStore.fetchClouds()
      clouds.value = cloudStore.getClouds
      console.log("Clouds", clouds)
    })

    let selectedClouds = ref([])

    const allClouds = computed(() =>
        selectedClouds.value.length === clouds.value.length
    )

    const someClouds = computed(() =>
        selectedClouds.value.length > 0
    )

    function toggle () {
      console.log(allClouds.value, selectedClouds)
      if (allClouds.value) {
        selectedClouds.value = []
      } else {
        selectedClouds.value = clouds.value.slice() as any
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
