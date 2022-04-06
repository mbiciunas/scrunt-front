<template>
  <v-app>
    <AppBar/>
    <NavigationDrawer/>
    <v-main>
      <v-card height="300px">
        <HelloWorld/>
      </v-card>
      <v-card height="300px">
        <Frame/>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Frame from './components/Frame.vue'
import AppBar from './components/AppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'

export default defineComponent({
  name: 'App',

  components: {
    AppBar,
    NavigationDrawer,
    HelloWorld,
    Frame,
  },

  data () {
    return {
      //
    }
  },
})
</script>
