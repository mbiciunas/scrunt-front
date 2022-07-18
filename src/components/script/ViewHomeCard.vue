<template>
  <v-card v-if="!editScript">
    <v-card-title>
      Display Home
    </v-card-title>
    <v-card-text>
      {{scriptName}}
    </v-card-text>
    <v-card-text>
      {{scriptDescription}}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-pencil" @click="editScript = !editScript"></v-btn>
      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-if="editScript">
    <v-card-title>
      Edit Home
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="edit-home-form">
        <v-text-field
            label="Name"
            v-model="scriptName"></v-text-field>
        <v-textarea label="Description" v-model="scriptDescription"></v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn type="submit" color="primary" form="edit-home-form">Save</v-btn>
      <v-btn color="primary" @click="editScript = !editScript">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue'
import {useScriptStore} from "@/stores/script";

  export default defineComponent({
    props: {
      id: Number,
    },

    emits: ["close"],
    setup(props) {
      const script = useScriptStore();
      const editScript = ref(false)
      let scriptName = ref("")
      let scriptDescription = ref("")

      onMounted(async () => {
            console.log("onMounted props.id", props.id)
            await script.fetchScript(<number>props.id)
            scriptName.value = script.getName
            scriptDescription.value = script.getDescription
            console.log("onMounted script.getId", script.getId)
            console.log("onMounted script.getName", script.getName)
            console.log("onMounted script.getDescription", script.getDescription)
      })

      const onSubmit = () => {
        console.log("Name = ", scriptName)
        console.log("Description = ", scriptDescription)
        script.putNameDescription(scriptName.value, scriptDescription.value)
        editScript.value = false
        // context.emit('close')
      }

      // const onSubmit = () => {
      //   console.log("View Card - Clicked on run button")
      //   context.emit('close')
      // }

      return {
        scriptName,
        scriptDescription,
        // props,
        // script,
        // tab,
        editScript,
        onSubmit,
      }
    },

    components: {
      // RunDialog
      // ScriptDialog,
    },

  })
</script>
