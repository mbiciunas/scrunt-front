import { defineStore } from 'pinia'
import axios from "axios"

export type Script = { Id: number; Name: string; Description: string; Code: string }

export const useScriptStore = defineStore({
    id: "script",
    state: () => ({
        scripts: [] as Script[],
    }),
    getters: {
        getScripts(state){
            return state.scripts
        },
        getScriptById: (state) => {
            return (scriptId: number) => state.scripts.find((script) => script.Id === scriptId)
        },

        // getScript(state, id: number){
        //     return state.scripts[id]
        // }
    },
    actions: {
        async fetchScripts() {
            try {
                const data = await axios.get('http://localhost:8080/api/scripts')
                this.scripts = data.data
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        }
    },
})