<template>
  <v-select
      v-model="selectedKeyTypes"
      :items="keyTypes"
      item-title="Name"
      item-value="Id"
      chips
      label="Key Types"
      multiple
  >
    <template v-slot:prepend-item>
      <v-list-item
          title="Select All"
          @click="toggle"
      >
        <template v-slot:prepend>
          <v-checkbox-btn
              :color="someKeys ? 'indigo-darken-4' : undefined"
              :indeterminate="someKeys && !allKeys"
              :model-value="someKeys"
          ></v-checkbox-btn>
        </template>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script lang='ts'>
import {defineComponent, computed, ref, onMounted, toRefs} from 'vue'
import {useAllKeysStore} from "@/stores/allKeys";

export default defineComponent({
  setup: function () {
    const allKeysStore = useAllKeysStore();
    const {keyTypes, selectedKeyTypes} = toRefs(allKeysStore)

    onMounted(async () => {
      await allKeysStore.fetchKeyTypes()
    })

    const allKeys = computed(() =>
        selectedKeyTypes.value.length === keyTypes.value.length
    )

    const someKeys = computed(() =>
        selectedKeyTypes.value.length > 0
    )

    function toggle() {
      if (allKeys.value) {
        selectedKeyTypes.value = []
      } else {
        selectedKeyTypes.value = keyTypes.value.map(({Id}) => Id)
      }
    }

    return {
      allKeys,
      someKeys,
      toggle,
      keyTypes,
      selectedKeyTypes,
    }
  },
})
</script>
