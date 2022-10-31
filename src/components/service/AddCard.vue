<template>
  <v-card>
    <v-card-title>
      Add Service
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="add-script-form">
        <v-text-field
            label="Name"
            v-model="scriptName"></v-text-field>
        <v-textarea label="Description" v-model="scriptDescription"></v-textarea>
        <v-textarea label="Code" v-model="scriptCode"></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary" form="add-script-form">Add Script</v-btn>
      <v-btn color="primary" @click="$emit('close')">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import {useAllScriptsStore} from '@/stores/allScripts';

  export default defineComponent({
    setup(props, context) {
      const allScripts = useAllScriptsStore();
      let scriptName = ref("")
      let scriptDescription = ref("")
      let scriptCode = ref("")

      const onSubmit = () => {
        console.log("Name = ", scriptName)
        console.log("Description = ", scriptDescription)
        console.log("Code = ", scriptCode)
        allScripts.postScripts(scriptName.value, scriptDescription.value, scriptCode.value)
        context.emit('close')
      }

      return {
        scriptName,
        scriptDescription,
        scriptCode,
        onSubmit,
      }
    },

  })
</script>
