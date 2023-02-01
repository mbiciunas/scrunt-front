<template>
  <v-sheet width="800" height="500">
    <v-toolbar color="primary" density="compact">
      <v-toolbar-title>{{ name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title background-color="primary" slider-color="white">
          <v-tab value="home">Home</v-tab>
          <v-tab value="edit">Edit</v-tab>
          <v-tab value="history">History</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

      <v-window v-model="tab">
        <v-window-item value="home">
          <view-home-card :id=props.id v-on:close="$emit('close')"></view-home-card>
        </v-window-item>

        <v-window-item value="edit">
          <view-edit-card :id=props.id v-on:close="$emit('close')"></view-edit-card>
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
  import ViewEditCard from "@/components/service/view/ViewEditCard.vue";
  import ViewHistoryCard from "@/components/service/view/ViewHistoryCard.vue";

  const props = defineProps({
    id: {type: Number, required: true},
    name: {type: String, required: true},
  })

  const tab = ref('home')
</script>
