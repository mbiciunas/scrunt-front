<template>
  <template v-if="edit">
    <td>
      <v-select
          v-model="serviceTypeId"
          :items="serviceTypes"
          item-title="Name"
          item-value="Id"
          label="Required Service"
          hint="This is a hint"
      ></v-select>
    </td>
    <td>
      <v-text-field
          v-model="scriptServiceTypeName"
          label="Unique Name"
          type="input"
          hint="Valid python names only, no spaces"
      ></v-text-field>
    </td>
    <td class="text-right">
      <v-btn icon="mdi-content-save" size="small" variant="plain" @click="saveEdit()"></v-btn>
      <v-btn icon="mdi-cancel" size="small" variant="plain" @click="cancelEdit()"></v-btn>
    </td>
  </template>
  <template v-else>
    <td>
      {{ serviceTypes[serviceTypes.findIndex(x => x.Id === serviceTypeId)].Name }}
    </td>
    <td>
      {{ name }}
    </td>
    <td class="text-right">
      <v-btn icon="mdi-pencil" size="small" variant="plain" @click="editService()"></v-btn>
      <v-btn icon="mdi-delete" size="small" variant="plain" @click="deleteScriptServiceType()"></v-btn>
    </td>
  </template>
</template>

<script setup lang='ts'>
  import {ref} from 'vue'
  import {useScriptStore} from "@/stores/script";
  import type { ScriptServiceTypes } from "@/components/script/view/ViewPrerequisiteCard.vue"
  import type { PropType } from 'vue'

  const props = defineProps({
    scriptId: { type: Number, required: true },
    scriptServiceTypeId: { type: Number, required: true },
    serviceTypeId: { type: Number, required: true },
    name: { type: String, required: true },
    serviceTypes: { type: Array as PropType<Array<ScriptServiceTypes>>, required: true },
  })

  // const emit = defineEmits(
  //     ['update:modelValue']
  // )

  // // const selectedServiceTypes = ref({Id: '', Name: '', Icon: ''})
  // const description = ref(props.initialDescription)

  const edit = ref(props.scriptServiceTypeId == 0)

  const scriptStore = useScriptStore();

  // await scriptStore.fetchScriptServices()

  const scriptService = ref()
  scriptService.value = scriptStore.getScriptService

  console.log("RequiredServices.setup - scriptService", scriptService.value)

  const serviceTypeId = ref(props.serviceTypeId)
  const scriptServiceTypeName = ref()
  scriptServiceTypeName.value = props.name

  // const submitAdd = async () => {
  //   editId.value = await scriptStore.addScriptService()
  //   console.log("RequiredServices.submitAdd - serviceTypes", props.serviceTypes)
  //   console.log("RequiredServices.submitAdd - scriptService", scriptService.value)
  // }

  const editService = () => {
    edit.value = true
    console.log("RequiredServices.editService")
  }

  const cancelEdit = () => {
    edit.value = false
    console.log("RequiredServices.cancelEdit")
  }

  const saveEdit = async () => {
    if (props.scriptServiceTypeId == 0) {
      await scriptStore.postScriptServiceType(props.scriptId, serviceTypeId.value, scriptServiceTypeName.value)
    }
    else {
      await scriptStore.putScriptServiceType(props.scriptServiceTypeId, props.scriptId, serviceTypeId.value, scriptServiceTypeName.value)
    }

    edit.value = false
  }

  const deleteScriptServiceType = async () => {
    console.log("RequiredServices.deleteService")
    await scriptStore.deleteScriptServiceType(props.scriptServiceTypeId, props.scriptId)

    edit.value = false
  }
</script>
