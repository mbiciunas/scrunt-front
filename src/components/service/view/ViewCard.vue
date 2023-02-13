<template>
  <v-sheet width="800" height="500">
    <v-toolbar color="primary" density="compact">
      <v-toolbar-title>{{ name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title background-color="primary" slider-color="white">
          <v-tab value="home">Home</v-tab>
          <v-tab value="key">Keys</v-tab>
          <v-tab value="history">History</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

      <v-window v-model="tab">
        <v-window-item value="home">
          <view-home-card :id=props.id v-on:close="$emit('close')"></view-home-card>
        </v-window-item>

        <v-window-item value="key">
          <suspense>
            <view-key-card :service-id=props.id v-on:close="$emit('close')"></view-key-card>
          </suspense>
        </v-window-item>

        <v-window-item value="history">
          <view-history-card :id=props.id v-on:close="$emit('close')"></view-history-card>
        </v-window-item>
      </v-window>
  </v-sheet>
</template>

<style>
  html { overflow-y: auto }
</style>

<script setup lang='ts'>
  import {ref} from 'vue'
  import ViewHomeCard from "@/components/service/view/ViewHomeCard.vue";
  import ViewKeyCard from "@/components/service/view/ViewKeyCard.vue";
  import ViewHistoryCard from "@/components/service/view/ViewHistoryCard.vue";

  const props = defineProps({
    id: {type: Number, required: true},
    name: {type: String, required: true},
  })

  const tab = ref('home')
</script>
