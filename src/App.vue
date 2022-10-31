<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Scrunt</v-app-bar-title>
        <v-tabs>
          <v-tab to="/script">Scripts</v-tab>
          <v-tab to="/service">Services</v-tab>
          <v-tab to="/key">Keys</v-tab>
        </v-tabs>
    </v-app-bar>

    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppBar from '@/components/AppBar.vue'

export default defineComponent({
  name: 'App',

  components: {
    AppBar,
  },

  data () {
    return {
      //
    }
  },
})
</script>
