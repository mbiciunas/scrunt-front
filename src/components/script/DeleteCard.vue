<template>
  <v-card elevation="10">
    <v-card-title>
      Delete Script
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="delete-script-form">
          <v-text-field label="Name" v-model="props.title" disabled></v-text-field>
          <v-textarea label="Description" v-model="props.description" disabled></v-textarea>
          <v-checkbox
              v-model="deleteScript"
              label="Delete Script"
          ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" form="delete-script-form" :disabled="!deleteScript" >Delete Script</v-btn>
      <v-btn color="primary" @click="$emit('close')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import { useAllScriptsStore } from '@/stores/allScripts';

  export default defineComponent({
    props: {
      id: Number,
      title: String,
      description: String
    },
    setup(props, context) {
      console.log("id", props.id)
      console.log("title", props.title)
      console.log("description", props.description)
      const allScripts = useAllScriptsStore();
      let deleteScript = ref(false)
      // let scriptDescription = ref("")

      const onSubmit = () => {
        allScripts.deleteScript(<number>props.id)
        context.emit('close')
      }

      return {
        props,
        deleteScript,
        onSubmit,
      }
    },

  })
</script>
