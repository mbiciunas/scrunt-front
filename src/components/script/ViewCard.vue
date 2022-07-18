<template>
  <v-sheet width="800">
    <v-tabs
        v-model="tab"
        background-color="primary"
    >
      <v-tab value="home">Home</v-tab>
      <v-tab value="script">Script</v-tab>
      <v-tab value="run">Run</v-tab>
      <v-tab value="output">Output</v-tab>
      <v-tab value="comments">Comments</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="home">
          <view-home-card :id=props.id v-on:close="$emit('close')"></view-home-card>
        </v-window-item>

        <v-window-item value="script">
          <view-script-card :id=props.id v-on:close="$emit('close')"></view-script-card>
        </v-window-item>

        <v-window-item value="run">
          <view-run-card :id=props.id v-on:close="$emit('close')"></view-run-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-sheet>
</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import ViewHomeCard from "@/components/script/ViewHomeCard.vue";
import ViewScriptCard from "@/components/script/ViewScriptCard.vue";
import ViewRunCard from "@/components/script/ViewRunCard.vue";

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
      ViewScriptCard,
      ViewRunCard,
    },
  })
</script>
