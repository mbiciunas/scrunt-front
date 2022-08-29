<template>
  <v-navigation-drawer permanent expand-on-hover rail-width="256">
    <v-container fluid>
      <h1>Services</h1>

      <service-type-select></service-type-select>
      <cloud-select></cloud-select>
      <project-select></project-select>

    </v-container>

  </v-navigation-drawer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ServiceTypeSelect from "@/components/service/navigation/ServiceTypeSelect.vue";
import CloudSelect from "@/components/service/navigation/CloudSelect.vue";
import ProjectSelect from "@/components/service/navigation/ProjectSelect.vue";

export default defineComponent({
  setup() {

    return {
    }
  },

  components: {
    ServiceTypeSelect,
    CloudSelect,
    ProjectSelect,
  },
})
</script>
