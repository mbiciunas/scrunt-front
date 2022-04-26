<template>
  <v-card width="500px">
    <v-card-title>
      {{props.id}}
      {{props.title}}
    </v-card-title>
    <v-card-text>
      {{props.script}}
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block @click="$emit('close')">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    id: Number,
    title: String,
    script: String
  },

  setup(props) {

    return {
      props
    }
  },

  components: {
    // RunDialog
    // ScriptDialog,
  },

})
</script>
