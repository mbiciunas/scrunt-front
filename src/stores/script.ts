import { defineStore } from 'pinia'
import axios from "axios"

export const useScriptStore = defineStore({
    id: "script",
    state: () => ({
        id: 0,
        name: "",
        description: "",
        code: "",
    }),
    getters: {
        getId(state){
            return state.id
        },
        getName(state){
            return state.name
        },
        getDescription(state){
            return state.description
        },
        getCode(state){
            return state.code
        },
    },
    actions: {
        async fetchScript(id: number) {
            try {
                await console.log("fetchScript start get")

                const data = await axios.get('http://localhost:8080/api/scripts/' + id)
                await console.log("fetchScript end get")
                this.id = await data.data.Id
                this.name = await data.data.Name
                this.description = await data.data.Description
                this.code = await data.data.Code

                console.log("New Id", this.id)
                console.log("New Name", this.name)
                console.log("New Description", this.description)
                console.log("New Code", this.code)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async putScript(name: string, description: string) {
            const data = <JSON><unknown>{
                "Name": name,
                "Description": description,
                "Code": this.code
            }

            try {
                await axios.put('http://localhost:8080/api/scripts/' + this.id, data)

                await this.fetchScript(this.id)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async runScript(id: number) {
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