<template>
  <v-navigation-drawer permanent>
    <v-container fluid>
      <h1>Services</h1>
      <service-type-select></service-type-select>
      <cloud-select></cloud-select>
      <project-select></project-select>
    </v-container>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
            color="blue"
            fab
            dark
            size="x-large"
            block
            @click="addDialog = true"
        >
          <v-icon>mdi-plus</v-icon>Add Service
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-dialog v-model="addDialog">
    <suspense>
      <add-card v-on:close="addDialog = false" />
    </suspense>
  </v-dialog>
</template>

<script setup lang='ts'>
  import {ref} from 'vue'
  import ServiceTypeSelect from "@/components/service/navigation/ServiceTypeSelect.vue";
  import CloudSelect from "@/components/service/navigation/CloudSelect.vue";
  import ProjectSelect from "@/components/service/navigation/ProjectSelect.vue";
  import AddCard from "@/components/service/AddCard.vue";

  const addDialog = ref(false)
</script>
