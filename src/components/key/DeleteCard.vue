<template>
  <v-card elevation="10">
    <v-card-title>
      Delete Key
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="delete-key-form">
          <v-text-field label="Name" v-model="props.title" disabled></v-text-field>
          <v-textarea label="Description" v-model="props.description" disabled></v-textarea>
          <v-checkbox
              v-model="deleteKey"
              label="Confirm Delete"
          ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" form="delete-key-form" :disabled="!deleteKey" >Delete Key</v-btn>
      <v-btn color="primary" @click="$emit('close')">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import { useAllKeysStore } from '@/stores/allKeys';

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
      const allKeys = useAllKeysStore();
      let deleteKey = ref(false)

      const onSubmit = () => {
        allKeys.deleteKey(<number>props.id)
        context.emit('close')
      }

      return {
        props,
        deleteKey,
        onSubmit,
      }
    },

  })
</script>
