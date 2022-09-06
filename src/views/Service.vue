<template>
  <NavigationDrawer rail/>
  <v-main>
    <ServiceGrid/>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ServiceGrid from '@/components/service/ServiceGrid.vue'
import NavigationDrawer from '@/components/service/navigation/NavigationDrawer.vue'

export default defineComponent({
  components: {
    NavigationDrawer,
    ServiceGrid,
  },

  data () {
    return {
      //
    }
  },
})
</script>
