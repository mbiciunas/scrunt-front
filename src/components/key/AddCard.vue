<template>
  <v-card width="800" min-height="500">
    <v-card-title>
      Add Key
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="add-script-form">
        <v-text-field label="Name" v-model="keyName"></v-text-field>
        <v-textarea label="Description" v-model="keyDescription"></v-textarea>
        <v-select
            v-model="keyTypeId"
            :items="keyTypes"
            item-title="Name"
            item-value="Id"
            label="Key Type"
            density="comfortable"
        ></v-select>

        <v-textarea label="Private Key" v-model="keyPrivate"></v-textarea>
        <v-textarea label="Public Key" v-model="keyPublic"></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn type="submit" color="primary" form="add-script-form">Add Key</v-btn>
      <v-btn color="primary" @click="$emit('close')">Close Dialog</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref, toRefs} from 'vue'
  import {useAllKeysStore} from '@/stores/allKeys';

  export default defineComponent({
    setup(props, context) {
      const allKeysStore = useAllKeysStore();
      let keyName = ref("")
      let keyDescription = ref("")
      let keyPrivate = ref("")
      let keyPublic = ref("")
      let keyTypeId = ref("")
      const {keyTypes} = toRefs(allKeysStore)

      onMounted(async () => {
        console.log("AddCard - onMounted")
        await allKeysStore.fetchKeyTypes()
        console.log("onMounted allKeys.getId", allKeysStore.getKeyTypes)
      })

      const onSubmit = () => {
        console.log("Name = ", keyName.value)
        console.log("Description = ", keyDescription.value)
        console.log("Key Type = ", keyTypeId.value)
        console.log("Private = ", keyPrivate.value)
        console.log("Public = ", keyPublic.value)
        allKeysStore.postKeys(keyName.value, keyDescription.value, 1, keyPrivate.value, keyPublic.value)
        context.emit('close')
      }

      return {
        keyName,
        keyDescription,
        keyPrivate,
        keyPublic,
        keyTypes,
        keyTypeId,
        onSubmit,
      }
    },
  })
</script>
