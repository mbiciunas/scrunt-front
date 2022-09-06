<template>
  <NavigationDrawer rail/>
  <v-main>
    <ScriptGrid/>
  </v-main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ScriptGrid from '@/components/script/ScriptGrid.vue'
  import NavigationDrawer from '@/components/script/NavigationDrawer.vue'

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
