<template>
  <v-card>
<!--    <v-card-title>-->
<!--      Add Script-->
<!--    </v-card-title>-->
    <v-card-text>
      <v-form>
        <v-container>
        <v-text-field
            label="Name"
            v-model="scriptName"></v-text-field>
<!--        <v-textarea label="Description" v-model="scriptDescription"></v-textarea>-->
<!--        <v-textarea label="Code" v-model="scriptCode"></v-textarea>-->
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
<!--      <v-btn color="primary">Add Script</v-btn>-->
<!--      <v-btn color="primary" @click="$emit('close')">Close Dialog</v-btn>-->
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      let scriptName = ref("")
      let scriptDescription = ref("")
      let scriptCode = ref("")

      return {
        scriptName,
        scriptDescription,
        scriptCode,
      }
    },

  })
</script>
