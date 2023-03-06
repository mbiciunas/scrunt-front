<template>
  <v-card>
    <v-card-title>
      Required Services
    </v-card-title>

    <v-card-text>
      <v-table fixed-header height="300px">
        <thead>
        <tr>
          <th class="text-left">
            Service Type
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
        <tr v-for="serviceItem in scriptServices" :key="serviceItem.ServiceTypeId" >
<!--          {{scriptId}}  {{keyItem.ServiceTypeId}}  {{serviceTypes}}  {{keyItem.Name}}-->
          <RequiredService :script-id="scriptId" :script-service-type-id="serviceItem.Id" :service-type-id="serviceItem.ServiceTypeId" :service-types="serviceTypes" :name="serviceItem.Name"></RequiredService>
<!--          <EditKey :service-key-id="keyItem.ServiceKeyId" :name="keyItem.KeyName" :description="keyItem.KeyDescription" :service-id="serviceId" :keys="keys"></EditKey>-->
        </tr>
        <tr>
          <td>
            <v-btn v-on:click="submitAdd" color="primary">Add</v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>

<!--    <v-card-text>-->
<!--      <v-form @submit.prevent="onSubmit" id="edit-home-form">-->
<!--        <RequiredService initial-description="scriptName1"  :service-types="serviceTypes"></RequiredService>-->
<!--      </v-form>-->
<!--    </v-card-text>-->

<!--    <v-card-actions>-->
<!--      <v-btn type="submit" color="primary" form="edit-home-form">Save</v-btn>-->
<!--      <v-btn color="primary">Cancel</v-btn>-->
<!--    </v-card-actions>-->
  </v-card>
</template>

<script setup lang='ts'>
  import {ref} from 'vue'
  import RequiredService from "@/components/script/view/RequiredServices.vue";
  import {useAllServicesStore} from "@/stores/allServices";
  import {useScriptStore} from "@/stores/script";
  import {storeToRefs} from "pinia";

  export interface ScriptServiceTypes {
    ScriptServiceTypeId: number;
    ServiceTypeId: number;
    Name: string;
  }

  const props = defineProps(
      {scriptId: Number}
  )

  const emit = defineEmits(
      ['close']
  )

  const allServicesStore = useAllServicesStore();
  const serviceTypes = ref()

  await allServicesStore.fetchServiceTypes()
  serviceTypes.value = await allServicesStore.getServiceTypes

  const scriptStore = useScriptStore();

  await scriptStore.fetchScriptServices()


  // const scriptService = ref()
  // scriptService.value = scriptStore.getScriptService
  const { scriptServices } = storeToRefs(useScriptStore());
  console.log("ViewPrerequisiteCard.setup - scriptService", scriptServices.value)


  const submitAdd = async () => {
    await scriptStore.addScriptServiceType()
  }

  // const onSubmit = () => {
  //   console.log("RequiredServices.onSubmit - scriptService")
  //   // script.putNameDescription(scriptName.value, scriptDescription.value)
  // }
</script>
