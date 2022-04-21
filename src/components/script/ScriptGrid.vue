<template>
  <v-container fluid="fluid">
    <v-row justify="center">

      <v-col v-for="gettersScript in getScripts" :key="gettersScript.id" cols="12" sm="12" md="6" lg="4" xl="3" xxl="2">
        <v-hover v-slot="{ isHovering, props }">
        <v-card
            class="mx-auto"
            max-width="344"
            v-bind="props"
            dark>

          <v-tabs
              v-model="gettersScript.id"
              background-color="primary"
              density="compact"
          >
            <v-tab value="one">Home</v-tab>
            <v-tab value="two">Script</v-tab>
            <v-tab value="three">Output</v-tab>
          </v-tabs>

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

          <v-overlay
              :model-value="isHovering"
              contained="True"
              scrim="#339966"
              class="align-center justify-center"
          >
            <v-btn @click="greet(gettersScript.Id)" flat="true">See more info</v-btn>

          </v-overlay>
        </v-card>
        </v-hover>
      </v-col>

    </v-row>
  </v-container>

  <v-btn
      color="blue"
      fab
      dark
      size="x-large"
      absolute
      bottom
      right
      @click="dialog = true"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>






  <v-hover v-slot="{ isHovering, props }">
    <v-card
        class="mx-auto"
        max-width="344"
        v-bind="props"
    >
      <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>

      <v-card-title>
        <v-rating
            :value="4"
            dense
            color="orange"
            background-color="orange"
            hover="true"
            class="mr-2"
        ></v-rating>
        <span class="primary--text text-subtitle-2">64 Reviews</span>
      </v-card-title>

      <v-card-text>
        <h2 class="text-h6 primary--text">
          Magento Forests {{ dialog }}
        </h2>
        Travel to the best outdoor experience on planet Earth. A vacation you will never forget!
      </v-card-text>

      <v-overlay
          :model-value="isHovering"
          contained="true"
          scrim="#036358"
          class="align-center justify-center"
      >
        <v-btn @click="greet(123)" flat="true">See more info</v-btn>
      </v-overlay>
    </v-card>
  </v-hover>

  <v-dialog
      v-model="dialog"
  >
    <v-card>
      <v-card-text>
        {{getScripts[scriptId]}}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block="true" @click="dialog = false">Close Dialog</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>



<!--Above the {{getScripts[scriptId]}} gets the ordinal entry from scripts.  We need to get the actual id.-->



</template>

<script lang='ts'>
  import { defineComponent, ref } from 'vue'
  import {onMounted, computed } from 'vue';
  import { useScriptStore } from '@/stores/script';

  export default defineComponent({
    setup() {
      const scripts = useScriptStore();

      const getScripts = computed(() => {
        return scripts.getScripts
      })

      let dialog = ref(false)
      let scriptId = ref(0)

      const greet = (id: number) => {
        alert(`Hello ${id} dialog is ${dialog}!`)
        dialog.value = true
        scriptId.value = id
        // alert(`Hello ${id} dialog is ${dialog}!`)
        // `event` is the native DOM event
        // if (event) {
        //   alert(event.target.tagName)
        // }
      }

      onMounted(() => {
        scripts.fetchUsers();
      })

      return {
        scripts,
        getScripts,
        greet,
        dialog,
        scriptId
      }
    },

    components: {
      // ScriptDialog,
    },

  })
</script>
