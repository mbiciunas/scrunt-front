<template>
  <v-sheet width="800" height="500">
    <v-toolbar color="primary" density="compact">
      <v-toolbar-title>{{ name }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title background-color="primary" slider-color="white">
          <v-tabs-slider color="white"></v-tabs-slider>
          <v-tab value="home">Home</v-tab>
          <v-tab value="prerequisite">Prerequisites</v-tab>
          <v-tab value="edit">Edit</v-tab>
          <v-tab value="run">Run</v-tab>
          <v-tab value="comments">Comments</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

      <v-window v-model="tab">
        <v-window-item value="home">
          <view-home-card :id=props.id v-on:close="$emit('close')"></view-home-card>
        </v-window-item>

        <v-window-item value="prerequisite">
          <suspense>
            <view-prerequisite-card :id=props.id v-on:close="$emit('close')"></view-prerequisite-card>
          </suspense>
        </v-window-item>

        <v-window-item value="edit">
          <view-edit-card :id=props.id v-on:close="$emit('close')"></view-edit-card>
        </v-window-item>

        <v-window-item value="run">
          <view-run-card :id=props.id v-on:setOutput="setOutput" v-on:close="$emit('close')"></view-run-card>
        </v-window-item>

        <v-window-item value="comments">
          <view-comment-card :id=props.id v-on:setOutput="setOutput" v-on:close="$emit('close')"></view-comment-card>
        </v-window-item>
      </v-window>
  </v-sheet>
</template>

<style>
  html { overflow-y: auto }
</style>

<script setup lang='ts'>
  import {ref} from 'vue'
  import ViewHomeCard from "@/components/script/view/ViewHomeCard.vue";
  import ViewPrerequisiteCard from "@/components/script/view/ViewPrerequisiteCard.vue";
  import ViewEditCard from "@/components/script/view/ViewEditCard.vue";
  import ViewRunCard from "@/components/script/view/ViewRunCard.vue";
  import ViewCommentCard from "@/components/script/view/ViewCommentCard.vue";


  const props = defineProps(
      {id: Number, name: String}
  )

  const tab = ref('home')

  const setOutput = () => {
    console.log("run setOutput")
    tab.value = 'script'
  }
</script>
