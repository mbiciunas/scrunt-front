<template>
  <v-app>
    <AppBar/>
    <NavigationDrawer/>
    <v-main>
      <v-card height="600px">
        <HelloAPI/>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloAPI from './components/HelloAPI.vue'
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
