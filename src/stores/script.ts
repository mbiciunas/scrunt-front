import { defineStore } from 'pinia'
import axios from "axios"

export type Script = { Id: number; Name: string; Script: string }

export const useScriptStore = defineStore({
    id: "script",
    state: () => ({
        scripts: [] as Script[],
    }),
    getters: {
        getScripts(state){
            return state.scripts
        }
    },
    actions: {
        async fetchUsers() {
            try {
                // const data = await axios.get('https://jsonplaceholder.typicode.com/users')
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