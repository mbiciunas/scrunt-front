<template>
  <v-card elevation="10">
    <v-card-title>
      Delete Script
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="delete-script-form">
        <v-container>
          <v-text-field label="Name" v-model="scriptName" disabled>{{props.title}}</v-text-field>
          <v-textarea label="Description" v-model="scriptDescription"></v-textarea>
<!--          <v-textarea label="Code" v-model="scriptCode"></v-textarea>-->
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary" form="delete-script-form">Delete Script</v-btn>
      <v-btn color="primary" @click="$emit('close')">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import { useScriptStore } from '@/stores/script';

  export default defineComponent({
    props: {
      id: Number,
      title: String,
      description: String
    },
    setup(props, context) {
      const scripts = useScriptStore();
      // let scriptName = ref("")
      let scriptDescription = ref("")
      // let scriptCode = ref("")

      const onSubmit = () => {
        // scripts.postScripts(scriptName.value, scriptDescription.value, scriptCode.value)
        context.emit('close')
      }

      return {
        props,
        // scriptName,
        scriptDescription,
        // scriptCode,
        onSubmit,
      }
    },

  })
</script>
