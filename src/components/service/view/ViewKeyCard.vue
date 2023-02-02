<template>
<!--  <div id="root" ref="root"></div>-->
  <v-card>
    <v-card-title>
      Keys
    </v-card-title>

    <v-card-text>
<!--      <v-form @submit.prevent="onSubmit" id="edit-script-form">-->
<!--        <v-textarea label="Code" v-model="scriptCode"></v-textarea>-->
        <div id="root" ref="root"></div>
<!--      </v-form>-->
    </v-card-text>

    <v-card-actions>
      <v-btn v-on:click="onSubmit" color="primary">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
  #root {
  /*width: 50vw;*/
  height: 20vh;
  }
</style>

<script setup lang='ts'>
  import {onMounted, onUnmounted, ref} from 'vue'
  import {useScriptStore} from "@/stores/script";
  import * as monaco from 'monaco-editor'
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

  // @ts-ignore
  self.MonacoEnvironment = {
    getWorker(_: string, label: string) {
      if (label === 'json') {
        return new jsonWorker()
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker()
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker()
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker()
      }
      return new editorWorker()
    }
  }

  const props = defineProps({
    id: Number,
  })

  const emit = defineEmits([
    'close'
  ])

  const root = ref<HTMLElement>()
  let editor: monaco.editor.IStandaloneCodeEditor
  const script = useScriptStore();
  let scriptCode = ref("")

  onMounted(async () => {
    await script.fetchScript(<number>props.id)
    scriptCode.value = script.getCode

    editor = await monaco.editor.create(root.value as HTMLElement, {
      language: 'python',
      value: scriptCode.value,
      lineNumbers: 'on',
      glyphMargin: false,
      folding: false,
      // lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      minimap: {
        enabled: false
      },
    })
  })

  onUnmounted(() => {
    editor.dispose()
  })

  const onSubmit = () => {
    script.putCode(editor.getValue())
  }
</script>
