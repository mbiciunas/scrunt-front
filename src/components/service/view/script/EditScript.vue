<template>
  <td>
    {{ props.name }}
  </td>
  <td>
    {{ description }}
  </td>
  <td class="text-right">
    <v-btn icon="mdi-pencil" size="small" variant="plain" @click=""></v-btn>
    <v-btn icon="mdi-delete" size="small" variant="plain" @click=""></v-btn>
  </td>
</template>

<script setup lang='ts'>
  const props = defineProps({
    scriptId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    serviceId: { type: Number, required: true },
  })
</script>
