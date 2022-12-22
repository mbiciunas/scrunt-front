import { defineStore } from 'pinia'
import axios from "axios"

export type ScriptServiceTypes = { Id: number; ServiceTypeId: number; Name: string; }

export const useScriptStore = defineStore({
    id: "script",
    state: () => ({
        id: 0,
        name: "",
        description: "",
        code: "",
        runId: 0,
        scriptServices: [] as ScriptServiceTypes[],
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
        getRunId(state){
            return state.runId
        },
        getScriptService(state){
            return state.scriptServices
        },
    },
    actions: {
        async fetchScript(id: number) {
            try {
                await console.log("fetchScript start get")

                const data = await axios.get('http://localhost:8080/api/scripts/' + id)
                await console.log("fetchScript end get")
                await console.log("script.fetchScript - data", data.data.Id)
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
        async fetchScriptServices() {
            try {
                const data = await axios.get('http://localhost:8080/api/scripts/' + this.id + "/services")
                console.log("Original scripts", this.scriptServices)
                console.log("Raw data", data.data)
                this.scriptServices = data.data.map((data: any) => {
                    console.log("id: " + data.Id, "name: " + data.ServiceTypeId, "name: " + data.Name)
                    const newScriptService: ScriptServiceTypes = {Id: data.Id, ServiceTypeId: data.ServiceTypeId, Name: data.Name}
                    console.log("newScriptService", newScriptService)
                    return newScriptService
                })

                // this.scripts = data.data
                console.log("new scripts", this.scriptServices)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async addScriptService() {
            const newScriptService: ScriptServiceTypes = {Id: 0, ServiceTypeId: 0, Name: ""}
            this.scriptServices.push(newScriptService)

            return newScriptService.Id
        },

        async deleteScriptService(id: number) {
            console.log("scripts.deleteScriptService - id", id)
            console.log("scripts.deleteScriptService - scriptServices", this.scriptServices)
            const indexOfObject = this.scriptServices.findIndex((object) => {
                return object.Id === id;
            })
            console.log("scripts.deleteScriptService - indexOfObject", indexOfObject)

            if (indexOfObject !== -1) {
                this.scriptServices.splice(indexOfObject, 1)
            }
            console.log("scripts.deleteScriptService - scriptServices", this.scriptServices)
        },

        async putNameDescription(name: string, description: string) {
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
        async putCode(code: string) {
            console.log("script.ts:putCode")
            const data = <JSON><unknown>{
                "Name": this.name,
                "Description": this.description,
                "Code": code
            }

            console.log(data)

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
            // let runId;
            try {
                const data = await axios.post('http://localhost:8080/api/scripts/' + id + '/run')
                this.runId = await data.data.Id
                await console.log("script.runScript - data", this.runId)
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})
