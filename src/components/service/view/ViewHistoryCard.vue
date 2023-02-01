<template>
  <v-card v-if="!editScript">
    <v-card-title>
      Service History
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

<script setup lang='ts'>
  import {onMounted, ref} from 'vue'
  import {useScriptStore} from "@/stores/script";

  const props = defineProps({
    id: Number,
  })

  const emit = defineEmits([
    'close'
  ])

  const script = useScriptStore();
  const editScript = ref(false)
  let scriptName = ref("")
  let scriptDescription = ref("")

  onMounted(async () => {
        await script.fetchScript(<number>props.id)
        scriptName.value = script.getName
        scriptDescription.value = script.getDescription
  })

  const onSubmit = () => {
    script.putNameDescription(scriptName.value, scriptDescription.value)
    editScript.value = false
  }
</script>
