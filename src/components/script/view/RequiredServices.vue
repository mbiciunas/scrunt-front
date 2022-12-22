<template>
  <v-table fixed-header height="300px">
    <thead>
      <tr>
        <th class="text-left">
          Service
        </th>
        <th class="text-left">
          Name
        </th>
        <th class="text-right">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="service in scriptService" :key="service.Id" >
        <template v-if="editId !== service.Id">
          <td>
            {{serviceTypes[serviceTypes.findIndex(x => x.Id === service.ServiceTypeId)].Name}}
          </td>
          <td>
            {{service.Name}}
          </td>
          <td class="text-right">
            <v-btn icon="mdi-pencil" size="small" variant="plain" @click="editService(service.Id)"></v-btn>
            <v-btn icon="mdi-delete" size="small" variant="plain" @click="deleteService(service.Id)"></v-btn>
          </td>
        </template>
        <template v-else>
          <td>
            <v-select
                v-model="service.ServiceTypeId"
                :items="serviceTypes"
                item-title="Name"
                item-value="Id"
                label="Required Service"
                hint="This is a hint"
            ></v-select>
          </td>
          <td>
            <v-text-field
                label="Unique Name"
                v-model="service.Name"
                type="input"
                hint="Valid python names only, no spaces"
            ></v-text-field>
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
import {ref} from 'vue'
import {useScriptStore} from "@/stores/script";

const props = defineProps(
      {initialDescription: String,
      serviceTypes: Array}
  )

  // const emit = defineEmits(
  //     ['update:modelValue']
  // )

  // const selectedServiceTypes = ref({Id: '', Name: '', Icon: ''})
  const description = ref(props.initialDescription)

  const editId = ref(-1)

  const scriptStore = useScriptStore();
  const scriptService = ref()

  await scriptStore.fetchScriptServices()
  scriptService.value = scriptStore.getScriptService

  console.log("RequiredServices.setup - scriptService", scriptService.value)

  const submitAdd = async () => {
    editId.value = await scriptStore.addScriptService()
    console.log("RequiredServices.submitAdd - serviceTypes", props.serviceTypes)
    console.log("RequiredServices.submitAdd - scriptService", scriptService.value)
  }

  const editService = (id: number) => {
    editId.value = id
    console.log("RequiredServices.editService", id)
  }

  const cancelEdit = () => {
    editId.value = -1
    console.log("RequiredServices.cancelEdit", editId.value)
  }

  const saveEdit = () => {
    editId.value = -1
    console.log("RequiredServices.saveEdit", editId.value)
  }

  const deleteService = (id: number) => {
    console.log("RequiredServices.deleteService", id)
    scriptStore.deleteScriptService(id)
  }
</script>
