<template>
  <v-navigation-drawer permanent rail-width="250">
    <h1>Scripts</h1>
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
          <v-icon>mdi-plus</v-icon>Add Script
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
import AddCard from "@/components/script/AddCard.vue";

export default defineComponent({
  setup() {

    const addDialog = ref(false)

    return {
      addDialog,
    }
  },

  components: {
    AddCard,
  },
})
</script>
