<template>
  <v-dialog
      v-model="dialog"
  >
    <v-card>
      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block="true" @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue'

  export default defineComponent({
    data: () => ({
      tab: null,
      overlay: false,
      dialog: false,
    }),

  })
</script>
