<template>
  <v-navigation-drawer permanent>
    <v-container fluid>
      <h1>Keys</h1>
      <key-type-select></key-type-select>
<!--      <cloud-select></cloud-select>-->
<!--      <project-select></project-select>-->
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
          <v-icon>mdi-plus</v-icon>Add Key
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <v-dialog v-model="addDialog">
    <add-card v-on:close="addDialog = false" />
  </v-dialog>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import KeyTypeSelect from "@/components/key/navigation/KeyTypeSelect.vue";
import CloudSelect from "@/components/service/navigation/CloudSelect.vue";
import ProjectSelect from "@/components/service/navigation/ProjectSelect.vue";
import AddCard from "@/components/service/AddCard.vue";

export default defineComponent({
  setup() {

    const addDialog = ref(false)

    return {
      addDialog,
    }
  },

  components: {
    KeyTypeSelect,
    CloudSelect,
    ProjectSelect,
    AddCard,
  },
})
</script>
