<template>
  <template v-if="edit">
    <td>
      <v-select
          v-model="keyId"
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
  import type { Key } from "@/components/service/view/RequiredKeys.vue"
  import type { PropType } from 'vue'

  const props = defineProps({
    serviceKeyId: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    keys: { type: Array as PropType<Array<Key>>, required: true },
    serviceId: { type: Number, required: true },
  })

  const edit = ref(props.serviceKeyId == 0)
  const keyId = ref()

  const serviceStore = useServiceStore();
  const serviceKey = ref()

  // await serviceStore.fetchServiceKeys()
  // serviceKey.value = serviceStore.getServiceKeys

  const editService = () => {
    edit.value = true
  }

  const cancelEdit = async () => {
    if (props.serviceKeyId == 0) {
      await serviceStore.deleteServiceKey(props.serviceId, props.serviceKeyId)
    }
    else {
      edit.value = false
    }
  }

  const saveEdit = async () => {
    await serviceStore.postServiceKey(props.serviceId, keyId.value)
    serviceKey.value = serviceStore.getServiceKeys
    edit.value = false
  }

  const deleteService = async () => {
    await serviceStore.deleteServiceKey(props.serviceId, props.serviceKeyId)
    serviceKey.value = serviceStore.getServiceKeys
    edit.value = false
  }
</script>
