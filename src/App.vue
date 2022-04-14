<template>
  <v-app>
    <AppBar/>
    <NavigationDrawer expand-on-hover rail/>
    <v-main>
      <v-card>
        <HelloAPI/>
      </v-card>

<!--      <v-container fluid="fluid">-->
<!--        <v-row justify="center">-->

<!--          <v-col v-for="n in 13" :key="n" cols="12" sm="12" md="6" lg="4" xl="3" xxl="2">-->
<!--            <v-card color="purple" dark>-->
<!--              <v-card-title primary class="title">Lorem</v-card-title>-->
<!--              <v-card-text>This is some text</v-card-text>-->
<!--            </v-card>-->
<!--          </v-col>-->

<!--        </v-row>-->
<!--      </v-container>-->


    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloAPI from './components/script/ScriptGrid.vue'
import AppBar from './components/AppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'

export default defineComponent({
  name: 'App',

  components: {
    AppBar,
    NavigationDrawer,
    HelloAPI,
  },

  data () {
    return {
      //
    }
  },
})
</script>
