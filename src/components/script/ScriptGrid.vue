<template>
<!--  <div class="hello">-->
<!--    <h1>{{ msg }}</h1>-->
<!--    <h1>Made By Getters</h1>-->
<!--    <div v-for='gettersScript in getScripts' :key='gettersScript.id'>-->
<!--      {{gettersScript.Id}} {{gettersScript.Name}} {{gettersScript.Script}}-->
<!--    </div>-->
<!--    <h1>Made By Actions</h1>-->
<!--    <div v-for='script in scripts' :key='script.Id'>-->
<!--      {{script.Id}} {{script.Name}} {{script.Script}}-->
<!--    </div>-->
<!--  </div>-->

  <v-container fluid="fluid">
    <v-row justify="center">

      <v-col v-for="gettersScript in getScripts" :key="gettersScript.id" cols="12" sm="12" md="6" lg="4" xl="3" xxl="2">
        <v-card dark>

          <v-tabs
              v-model="gettersScript.id"
              background-color="primary"
              density="compact"
          >
            <v-tab value="one">Home</v-tab>
            <v-tab value="two">Script</v-tab>
            <v-tab value="three">Output</v-tab>
          </v-tabs>

<!--          <v-card-title primary class="title">{{gettersScript.Name}}</v-card-title>-->
          <v-card-text>
            <v-window v-model="gettersScript.id">
              <v-window-item value="one">
                {{gettersScript.Name}}
              </v-window-item>

              <v-window-item value="two">
                {{gettersScript.Script}}
              </v-window-item>

              <v-window-item value="three">
                Three
              </v-window-item>
            </v-window>

          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>

</template>

<script lang='ts'>
  import { defineComponent } from 'vue'
  import {ref, onMounted, computed} from 'vue';
  import { useScriptStore } from '@/stores/script';

  export default defineComponent({
    setup() {
      const scripts = useScriptStore();

      const msg = ref("Welcome to my Scripts");

      const getScripts = computed(() => {
        return scripts.getScripts
      })

      onMounted(() => {
        scripts.fetchUsers();
      })

      return {
        msg,
        scripts,
        getScripts,
      }
    },

    data: () => ({
      tab: null,
    }),

  })
</script>
