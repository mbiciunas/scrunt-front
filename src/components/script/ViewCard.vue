<template>
  <v-sheet width="800px">
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
          <view-home-card></view-home-card>
        </v-window-item>

        <v-window-item value="script">
          <v-card>
            <v-card-title>
              Two
            </v-card-title>
          </v-card>
        </v-window-item>

        <v-window-item value="run">
          <v-card>
            <v-card-title>
              Three
            </v-card-title>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>

<!--    <v-card-title>-->
<!--      View Card-->
<!--      {{props.id}}-->
<!--      {{props.title}}-->
<!--    </v-card-title>-->
<!--    <v-card-text>-->
<!--      <v-form @submit.prevent="onSubmit" id="run-script-form">-->
<!--        {{props.code}}-->
<!--      </v-form>-->
<!--    </v-card-text>-->
<!--    <v-card-actions>-->
<!--      <v-btn type="submit" color="primary" form="run-script-form">Run</v-btn>-->
<!--      <v-btn color="primary" @click="$emit('close')">Cancel</v-btn>-->
<!--    </v-card-actions>-->
  </v-sheet>
</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import { useScriptStore } from '@/stores/script';
  import ViewHomeCard from "@/components/script/ViewHomeCard.vue";

  export default defineComponent({
    props: {
      id: Number,
      title: String,
      code: String
    },

    setup(props, context) {
      const scripts = useScriptStore();
      const tab = ref('home')

      const onSubmit = () => {
        console.log("View Card - Clicked on run button")
        scripts.runScript(<number>props.id)
        context.emit('close')
      }

      return {
        props,
        onSubmit,
        tab,
      }
    },

    components: {
      ViewHomeCard
    },
  })
</script>
