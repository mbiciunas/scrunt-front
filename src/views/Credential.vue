<template>
  <NavigationDrawer rail/>
  <v-main>
    <v-card>
<!--      <ScriptGrid/>-->
    </v-card>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ScriptGrid from '@/components/script/ScriptGrid.vue'
import NavigationDrawer from '@/components/credential/NavigationDrawer.vue'

export default defineComponent({
  components: {
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
