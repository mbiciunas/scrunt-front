<template>
  <NavigationDrawer/>
  <v-main>
    <KeyGrid/>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KeyGrid from '@/components/key/KeyGrid.vue'
import NavigationDrawer from '@/components/key/navigation/NavigationDrawer.vue'

export default defineComponent({
  components: {
    NavigationDrawer,
    KeyGrid,
  },

  data () {
    return {
      //
    }
  },
})
</script>
