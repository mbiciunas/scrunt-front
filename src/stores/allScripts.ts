import { defineStore } from 'pinia'
import axios from "axios"

export type Script = { Id: number; Name: string; Description: string; Code: string }

export const useAllScriptsStore = defineStore({
    id: "scripts",
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
    },
    actions: {
        async fetchScripts() {
            try {
                const data = await axios.get('http://localhost:8080/api/scripts')
                console.log("Original scripts", this.scripts)
                console.log("Raw data", data.data)
                this.scripts = data.data.map((data: any) => {
                    console.log("id: " + data.Id, "name: " + data.Name)
                    const newScript: Script = {Id: data.Id, Name: data.Name, Description: data.Description, Code: data.Code}
                    console.log("newScript", newScript)
                    return newScript
                })

                // this.scripts = data.data
                console.log("new scripts", this.scripts)
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
                await axios.post('http://localhost:8080/api/scripts', post)

                await this.fetchScripts()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async deleteScript(id : number) {
            try {
                await axios.delete('http://localhost:8080/api/scripts/' + id)

                await this.fetchScripts()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async runScript(id : number) {
            try {
                await axios.post('http://localhost:8080/api/scripts/' + id + '/run')
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})