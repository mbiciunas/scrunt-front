import { defineStore } from 'pinia'
import axios from "axios"

// export type ScriptServiceTypes = {
//     Id: number;
//     ServiceTypeId: number;
//     Name: string;
// }

export const useServiceStore = defineStore({
    id: "service",
    state: () => ({
        id: 0,
        name: "",
        description: "",
        address: "",
        port: 0,
        serviceTypeId: 0,
        cloudId: 0,
        // scriptServices: [] as ScriptServiceTypes[],
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
        getAddress(state){
            return state.address
        },
        getPort(state){
            return state.port
        },
        getServiceTypeId(state){
            return state.serviceTypeId
        },
        getCloudId(state){
            return state.cloudId
        },
    },
    actions: {
        async fetchService(id: number) {
            try {
                const data = await axios.get('http://localhost:8080/api/services/' + id)
                this.id = await data.data.Id
                this.name = await data.data.Name
                this.description = await data.data.Description
                this.address = await data.data.Address
                this.port = await data.data.Port
                this.serviceTypeId = await data.data.ServiceTypeId
                this.cloudId = await data.data.CloudId
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

        // async fetchScriptServices() {
        //     try {
        //         const data = await axios.get('http://localhost:8080/api/scripts/' + this.id + "/services")
        //         console.log("Original scripts", this.scriptServices)
        //         console.log("Raw data", data.data)
        //         this.scriptServices = data.data.map((data: any) => {
        //             console.log("id: " + data.Id, "name: " + data.ServiceTypeId, "name: " + data.Name)
        //             const newScriptService: ScriptServiceTypes = {Id: data.Id, ServiceTypeId: data.ServiceTypeId, Name: data.Name}
        //             console.log("newScriptService", newScriptService)
        //             return newScriptService
        //         })
        //
        //         // this.scripts = data.data
        //         console.log("new scripts", this.scriptServices)
        //     }
        //     catch (error) {
        //         alert(error)
        //         console.log(error)
        //     }
        // },

        // async addScriptService() {
        //     const newScriptService: ScriptServiceTypes = {Id: 0, ServiceTypeId: 0, Name: ""}
        //     this.scriptServices.push(newScriptService)
        //
        //     return newScriptService.Id
        // },

        // async deleteScriptService(id: number) {
        //     console.log("scripts.deleteScriptService - id", id)
        //     console.log("scripts.deleteScriptService - scriptServices", this.scriptServices)
        //     const indexOfObject = this.scriptServices.findIndex((object) => {
        //         return object.Id === id;
        //     })
        //     console.log("scripts.deleteScriptService - indexOfObject", indexOfObject)
        //
        //     if (indexOfObject !== -1) {
        //         this.scriptServices.splice(indexOfObject, 1)
        //     }
        //     console.log("scripts.deleteScriptService - scriptServices", this.scriptServices)
        // },

        async putService(name: string, description: string, address: string, port: number, serviceTypeId: number, cloudId: number) {
            const data = <JSON><unknown>{
                "Name": name,
                "Description": description,
                "Address": address,
                "Port": port,
                "ServiceTypeId": serviceTypeId,
                "CloudId": cloudId
            }

            try {
                await axios.put('http://localhost:8080/api/services/' + this.id, data)

                await this.fetchService(this.id)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

        // async putCode(code: string) {
        //     console.log("script.ts:putCode")
        //     const data = <JSON><unknown>{
        //         "Name": this.name,
        //         "Description": this.description,
        //         "Code": code
        //     }
        //
        //     console.log(data)
        //
        //     try {
        //         await axios.put('http://localhost:8080/api/scripts/' + this.id, data)
        //
        //         await this.fetchScript(this.id)
        //     }
        //     catch (error) {
        //         alert(error)
        //         console.log(error)
        //     }
        // },

        // async runScript(id: number) {
        //     // let runId;
        //     try {
        //         const data = await axios.post('http://localhost:8080/api/scripts/' + id + '/run')
        //         this.runId = await data.data.Id
        //         await console.log("script.runScript - data", this.runId)
        //     } catch (error) {
        //         alert(error)
        //         console.log(error)
        //     }
        // },
    },
})
