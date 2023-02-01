<template>
  <v-table fixed-header>
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
      <tr v-for="service in modelValue" :key="service.Id" >
        <td>
          {{serviceTypes[serviceTypes.findIndex(x => x.Id === service.ServiceTypeId)].Name}} - {{service.Name}}
        </td>
        <td>
          <v-select
              v-model="service.SelectedValue"
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

  type NewScriptServiceTypes = {
    Id: number,
    ServiceTypeId: number;
    Name: string;
    SelectedValue: number,
    Services: Service[];
  }

  const props = defineProps({
    serviceTypes: {type: Object as PropType<Array<ServiceType>>, required: true},
    modelValue: { type: Array as PropType<Array<NewScriptServiceTypes>>, required: true },
  })

  const emit = defineEmits([
    'update:modelValue'
  ])

  const onChange = (event: Event) => {
    emit('update:modelValue', props.modelValue)
  }
</script>
