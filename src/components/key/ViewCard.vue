<template>
  <v-sheet width="800" height="500">
    <v-toolbar color="primary" density="compact">
      <v-toolbar-title>Your Key</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title background-color="primary" slider-color="white">
          <v-tabs-slider color="white"></v-tabs-slider>
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

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import ViewHomeCard from "@/components/key/ViewHomeCard.vue";
import ViewEditCard from "@/components/key/ViewEditCard.vue";
import ViewHistoryCard from "@/components/key/ViewHistoryCard.vue";

  export default defineComponent({
    props: {
      id: Number,
    },

    setup(props) {
      const tab = ref('home')

      return {
        props,
        tab,
      }
    },

    components: {
      ViewHomeCard,
      ViewEditCard,
      ViewHistoryCard,
    },
  })
</script>
