<template>
  <v-select
      v-model="selectedProjects"
      :items="projects"
      item-title="Name"
      item-value="Id"
      chips
      label="Projects"
      multiple
  >
    <template v-slot:prepend-item>
      <v-list-item
          title="Select All"
          @click="toggle"
      >
        <template v-slot:prepend>
          <v-checkbox-btn
              :color="someProjects ? 'indigo-darken-4' : undefined"
              :indeterminate="someProjects && !allProjects"
              :model-value="someProjects"
          ></v-checkbox-btn>
        </template>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script setup lang='ts'>
  import {computed, onMounted, toRefs} from 'vue'
  import {useAllServicesStore} from "@/stores/allServices";

  const allServices = useAllServicesStore();
  const { projects, selectedProjects } = toRefs(allServices)

  onMounted(async () => {
    await allServices.fetchProjects()
  })

  const allProjects = computed(() =>
      selectedProjects.value.length === projects.value.length
  )

  const someProjects = computed(() =>
      selectedProjects.value.length > 0
  )

  function toggle () {
    if (allProjects.value) {
      selectedProjects.value = []
    } else {
      selectedProjects.value = projects.value.map(({Id}) => Id)
    }
  }
</script>
