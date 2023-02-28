<template>
  <v-sheet width="800" height="500">
    <v-toolbar color="primary" density="compact">
      <v-toolbar-title>{{ name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title background-color="primary" slider-color="white">
          <v-tab value="home">Home</v-tab>
          <v-tab value="service">Service</v-tab>
          <v-tab value="history">History</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

      <v-window v-model="tab">
        <v-window-item value="home">
          <view-home-card :id=props.id v-on:close="$emit('close')"></view-home-card>
        </v-window-item>

        <v-window-item value="service">
          <suspense>
            <view-service-card :key-id=props.id v-on:close="$emit('close')"></view-service-card>
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
  import ViewHomeCard from "@/components/key/view/ViewHomeCard.vue";
  import ViewServiceCard from "@/components/key/view/service/ViewServiceCard.vue";
  import ViewHistoryCard from "@/components/key/view/ViewHistoryCard.vue";

  const props = defineProps({
    id: {type: Number, required: true},
    name: {type: String, required: true},
  })

  const tab = ref('home')
</script>
