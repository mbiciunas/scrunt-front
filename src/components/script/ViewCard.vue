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

<!--    <v-card-text>-->
<!--      {{script.getId}}-->
<!--      {{script.getName}}-->
<!--      {{script.getDescription}}-->
<!--      {{script.getCode}}-->
<!--    </v-card-text>-->

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="home">
          <view-home-card :id=props.id  v-on:close="$emit('close')"></view-home-card>
        </v-window-item>

        <v-window-item value="script">
          <view-script-card :id=props.id></view-script-card>
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
import {defineComponent, ref} from 'vue'
import ViewHomeCard from "@/components/script/ViewHomeCard.vue";
import ViewScriptCard from "@/components/script/ViewScriptCard.vue";

  export default defineComponent({
    props: {
      id: Number,
    },

    setup(props) {
      // const script = useScriptStore();
      const tab = ref('home')
      // let scriptData: Promise<any>

      // const onSubmit = () => {
      //   console.log("View Card - Clicked on run button")
      //   allScripts.runScript(<number>props.id)
      //   context.emit('close')
      // }

      // onMounted(() => {
      //   console.log("ViewCard props.id", props.id)
      //   script.fetchScript(<number>props.id)
      //   // scriptData = scripts.fetchScript(<number>props.id)
      //   console.log("ViewCard script.id", script.id)
      // })

      return {
        props,
        // script,
        // onSubmit,
        tab,
      }
    },

    components: {
      ViewHomeCard,
      ViewScriptCard,
    },
  })
</script>
