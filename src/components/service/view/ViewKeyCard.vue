<template>
  <v-card>
    <v-card-title>
      Keys
    </v-card-title>

    <v-card-text>
      <RequiredKey :service-id="serviceId" :keys="keys"></RequiredKey>
    </v-card-text>
  </v-card>
</template>

<script setup lang='ts'>
  import { ref } from 'vue'
  import RequiredKey from "@/components/service/view/RequiredKeys.vue";
  import { useAllKeysStore } from "@/stores/allKeys";

  const props = defineProps({
    serviceId: { type: Number, required: true },
  })

  const emit = defineEmits([
    'close'
  ])

  const allKeysStore = useAllKeysStore();
  const keys = ref()

  await allKeysStore.fetchKeys()
  keys.value = await allKeysStore.getKeys
  console.log("ViewKeyCard.setup - keys", keys.value)
</script>
