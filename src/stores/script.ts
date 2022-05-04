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
                console.log(this.scripts)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async postScripts(name : string, description : string, code : string) {
            const post = <JSON><unknown>{
                "Name": name,
                "Description": description,
                "Code": code
            }

            try {
                const data = await axios.post('http://localhost:8080/api/scripts', post)

                const newScript: Script = {Id: data.data, Name: name, Description: description, Code: code}

                this.scripts.push(newScript)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})