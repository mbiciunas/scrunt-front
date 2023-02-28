<template>
  <template v-if="edit">
    <td>
      <v-select
          v-model="serviceId"
          :items="keys"
          item-title="Name"
          item-value="Id"
          label="Key"
      ></v-select>
    </td>
    <td>
    </td>
    <td class="text-right">
      <v-btn icon="mdi-content-save" size="small" variant="plain" @click="saveEdit()"></v-btn>
      <v-btn icon="mdi-cancel" size="small" variant="plain" @click="cancelEdit()"></v-btn>
    </td>
  </template>
  <template v-else>
    <td>
      {{ name }}
    </td>
    <td>
      {{ description }}
    </td>
    <td class="text-right">
      <v-btn icon="mdi-pencil" size="small" variant="plain" @click="editService()"></v-btn>
      <v-btn icon="mdi-delete" size="small" variant="plain" @click="deleteService()"></v-btn>
    </td>


  </template>
</template>

<script setup lang='ts'>
  import { ref } from 'vue'
  import { useServiceStore } from "@/stores/service";
  import type { Service } from "@/components/key/view/service/ViewServiceCard.vue"
  import type { PropType } from 'vue'

  const props = defineProps({
    serviceKeyId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    services: { type: Array as PropType<Array<Service>>, required: true },
    keyId: { type: Number, required: true },
  })

  const edit = ref(props.serviceKeyId == 0)
  const serviceId = ref()

  const serviceStore = useServiceStore();

  const editService = () => {
    edit.value = true
  }

  const cancelEdit = async () => {
    if (props.serviceKeyId == 0) {
      await serviceStore.deleteServiceKey(props.serviceKeyId, props.keyId)
      edit.value = false
    }
    else {
      edit.value = false
    }
  }

  const saveEdit = async () => {
    if (props.serviceKeyId == 0) {
      await serviceStore.postServiceKey(props.keyId, serviceId.value)
    }
    else {
      await serviceStore.putServiceKey(props.serviceKeyId, props.keyId, serviceId.value)
    }

    edit.value = false
  }

  const deleteService = async () => {
    await serviceStore.deleteServiceKey(props.serviceKeyId, props.keyId)

    edit.value = false
  }
</script>
