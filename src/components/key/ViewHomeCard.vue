<template>
  <v-card v-if="!editKey">
    <v-card-title>
      Key Home
    </v-card-title>
    <v-card-text>
      {{keyName}}
    </v-card-text>
    <v-card-text>
      {{keyDescription}}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-pencil" @click="editKey = !editKey"></v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-if="editKey">
    <v-card-title>
      Edit Home
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="edit-home-form">
        <v-text-field
            label="Name"
            v-model="keyName"></v-text-field>
        <v-textarea label="Description" v-model="keyDescription"></v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn type="submit" color="primary" form="edit-home-form">Save</v-btn>
      <v-btn color="primary" @click="editKey = !editKey">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue'
import {useKeyStore} from "@/stores/key";

  export default defineComponent({
    props: {
      id: Number,
    },

    emits: ["close"],
    setup(props) {
      const key = useKeyStore();
      const editKey = ref(false)
      let keyName = ref("")
      let keyDescription = ref("")

      onMounted(async () => {
            console.log("onMounted props.id", props.id)
            await key.fetchKey(<number>props.id)
            keyName.value = key.getName
            keyDescription.value = key.getDescription
            console.log("onMounted script.getId", key.getId)
            console.log("onMounted script.getName", key.getName)
            console.log("onMounted script.getDescription", key.getDescription)
      })

      const onSubmit = () => {
        console.log("Name = ", keyName)
        console.log("Description = ", keyDescription)
        key.putNameDescription(keyName.value, keyDescription.value)
        editKey.value = false
        // context.emit('close')
      }

      // const onSubmit = () => {
      //   console.log("View Card - Clicked on run button")
      //   context.emit('close')
      // }

      return {
        keyName,
        keyDescription,
        // props,
        // script,
        // tab,
        editKey,
        onSubmit,
      }
    },

    components: {
      // RunDialog
      // ScriptDialog,
    },

  })
</script>
