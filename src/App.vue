<template>
  <v-app>
    <AppBar/>
    <NavigationDrawer rail/>
    <v-main>
      <v-card>
        <ScriptGrid/>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ScriptGrid from './components/script/ScriptGrid.vue'
import AppBar from './components/AppBar.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'

export default defineComponent({
  name: 'App',

  components: {
    AppBar,
    NavigationDrawer,
    ScriptGrid,
  },

  data () {
    return {
      //
    }
  },
})
</script>
