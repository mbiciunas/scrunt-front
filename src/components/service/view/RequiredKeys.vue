<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">
          Key
        </th>
        <th class="text-left">
          Description
        </th>
        <th class="text-right">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="key in serviceKey" :key="key.ServiceKeyId" >
        <template v-if="editId !== key.ServiceKeyId">
          <td>
            {{ key.KeyName }}
          </td>
          <td>
            {{ key.KeyDescription }}
          </td>
          <td class="text-right">
            <v-btn icon="mdi-pencil" size="small" variant="plain" @click="editService(key.ServiceKeyId)"></v-btn>
            <v-btn icon="mdi-delete" size="small" variant="plain" @click="deleteService(key.ServiceKeyId)"></v-btn>
          </td>
        </template>
        <template v-else>
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
      </tr>
      <tr>
        <td>
          <v-btn :disabled="editId >= 0" v-on:click="submitAdd" color="primary">Add</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useServiceStore } from "@/stores/service";
import type { PropType } from 'vue'

export interface Key {
  Id: number
  Name: string
  Description: number
  key_type_id: number
  key_type_name: string
  services: Array<any>
}

const props = defineProps({
    keys: { type: Array as PropType<Array<Key>>, required: true },
    serviceId: { type: Number, required: true },
  })

  const editId = ref(-1)
  const keyId = ref()

  const serviceStore = useServiceStore();
  const serviceKey = ref()

  await serviceStore.fetchServiceKeys()
  serviceKey.value = serviceStore.getServiceKeys

  const submitAdd = async () => {
    editId.value = await serviceStore.addServiceKey()
  }

  const editService = (id: number) => {
    editId.value = id
  }

  const cancelEdit = () => {
    editId.value = -1
  }

  const saveEdit = async () => {
    await serviceStore.postServiceKey(props.serviceId, keyId.value)
    serviceKey.value = serviceStore.getServiceKeys
    editId.value = -1
  }

  const deleteService = async (serviceKeyId: number) => {
    await serviceStore.deleteServiceKey(props.serviceId, serviceKeyId)
    serviceKey.value = serviceStore.getServiceKeys
    editId.value = -1
  }
</script>
