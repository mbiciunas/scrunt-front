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
                // Remove everything from this.scripts.
                // Build Script type with data from data...
                // Push into this.scripts.
                // Use map to traverse data and arrow function to transform data into type Script.

                // Add type to axios.get<???>
                // May need @types/axios plugin as developer dependency.
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

                // const newScript: Script = {Id: data.data, Name: name, Description: description, Code: code}

                // this.scripts.push(newScript)

                //
                // Rebuild store from fetch
                //
                await this.fetchScripts()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async deleteScript(id : number) {
            try {
                const data = await axios.delete('http://localhost:8080/api/scripts/' + id)

                //
                // Rebuild store from fetch
                //
                await this.fetchScripts()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async runScript(id : number) {
            try {
                const data = await axios.post('http://localhost:8080/api/scripts/' + id + '/run')
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})