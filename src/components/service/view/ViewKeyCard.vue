<template>
  <v-card>
    <v-card-title>
      Keys
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="onSubmit" id="edit-home-form">
        <RequiredKey :service-id="serviceId" :keys="keys"></RequiredKey>
      </v-form>
    </v-card-text>

<!--    <v-card-actions>-->
<!--      <v-btn type="submit" color="primary" form="edit-home-form">Save</v-btn>-->
<!--      <v-btn color="primary">Cancel</v-btn>-->
<!--    </v-card-actions>-->
  </v-card>
</template>

<script setup lang='ts'>
  import { ref } from 'vue'
  import RequiredKey from "@/components/service/view/RequiredKeys.vue";
  import { useAllKeysStore } from "@/stores/allKeys";

  const props = defineProps({
    serviceId: { type: Number, required: true },
  })

  console.log("ViewKeyCard.setup - serviceId", props.serviceId)

  const emit = defineEmits([
    'close'
  ])

  const allKeysStore = useAllKeysStore();
  const keys = ref()

  await allKeysStore.fetchKeys()
  keys.value = await allKeysStore.getKeys

  const onSubmit = () => {
    console.log("RequiredServices.onSubmit - scriptService")
    // script.putNameDescription(scriptName.value, scriptDescription.value)
  }
</script>
