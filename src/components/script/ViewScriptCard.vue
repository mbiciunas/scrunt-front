<template>
  <v-card v-if="!editCode">
    <v-card-title>
      Display Code
    </v-card-title>
    <v-card-text>
      {{scriptCode}}
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-pencil" @click="editCode = !editCode"></v-btn>
      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-if="editCode">
    <v-card-title>
      Edit Code
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="edit-script-form">
        <v-textarea label="Code" v-model="scriptCode"></v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-btn type="submit" color="primary" form="edit-script-form">Save</v-btn>
      <v-btn color="primary" @click="editCode = !editCode">Cancel</v-btn>
    </v-card-actions>

    <!--    <v-card-actions>-->
    <!--      <v-spacer></v-spacer>-->
    <!--      <v-btn icon="mdi-pencil" @click="edit = !edit"></v-btn>-->
    <!--    </v-card-actions>-->
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
    // const tab = ref('home')
    const editCode = ref(false)
    let scriptCode = ref("")

    onMounted(async () => {
      console.log("onMounted props.id", props.id)
      await script.fetchScript(<number>props.id)
      scriptCode.value = script.getCode
      console.log("onMounted script.getId", script.getId)
      console.log("onMounted script.getCode", script.getCode)
    })

    const onSubmit = () => {
      console.log("Code = ", scriptCode)
      script.putCode(scriptCode.value)
      editCode.value = false
      // context.emit('close')
    }

    // const onSubmit = () => {
    //   console.log("View Card - Clicked on run button")
    //   context.emit('close')
    // }

    return {
      scriptCode,
      // props,
      // script,
      // tab,
      editCode,
      onSubmit,
    }
  },

  components: {
    // CodeEditor
    // RunDialog
    // ScriptDialog,
  },

})
</script>
