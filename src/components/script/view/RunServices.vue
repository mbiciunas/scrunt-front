<template>
  <v-table fixed-header height="150px">
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
      <tr v-for="service in newScriptService" :key="service.Id" >
        <td>
          {{serviceTypes[serviceTypes.findIndex(x => x.Id === service.ServiceTypeId)].Name}} - {{service.Id}}- {{service.Name}} - {{service.ServiceTypeId}}
        </td>
        <td>
          <v-select
              v-model="modelValue[service.Id]"
              :items="service.Services"
              item-title="Name"
              item-value="Id"
              density="compact"
              @update:modelValue="onChange"
          ></v-select>
        </td>
        <td class="text-right">
          <v-btn icon="mdi-pencil" size="small" variant="plain" @click="editService(service.Id)"></v-btn>
          <v-btn icon="mdi-delete" size="small" variant="plain" @click="deleteService(service.Id)"></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang='ts'>
  import type {PropType} from 'vue'
  import type {ServiceType, Service} from "@/stores/allServices";
  import {ref} from "vue";

  type NewScriptServiceTypes = {
    Id: number,
    ServiceTypeId: number;
    Name: string;
    SelectedValue: number,
    Services: Service[];
  }

  const props = defineProps(
      {serviceTypes: {type: Object as PropType<Array<ServiceType>>, required: true},
        modelValue: { type: Array as PropType<Array<number>>, required: true },
        newScriptService: {type: Array as PropType<Array<NewScriptServiceTypes>>, required: true}
      }
  )

  const emit = defineEmits(
      ['update:modelValue']
  )

  // let result = ref([13,13])

  console.log("RunServices.setup - modelValue: ", props.modelValue)
  // console.log("RunServices.setup - result: ", result.value)

  const onChange = (event: Event) => {
    // props.modelValue = 321
    console.log("RunServices.onChange - event", event)
    console.log("RunServices.onChange - result", props.modelValue)
    emit('update:modelValue', props.modelValue)
  }
</script>
