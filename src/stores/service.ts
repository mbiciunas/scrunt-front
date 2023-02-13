import { defineStore } from 'pinia'
import axios from "axios"

export type ServiceKeys = {
    ServiceKeyId: number;
    KeyId: number;
    KeyName: string;
    KeyDescription: string;
    KeyTypeId: number;
    KeyTypeName: string;
}

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
        serviceKeys: [] as ServiceKeys[],
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
        getServiceKeys(state){
            console.log("service.getServiceKeys - state.serviceKeys", state.serviceKeys)
            return state.serviceKeys
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
                this.cloudId = data.data.CloudId
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

        async fetchServiceKeys() {
            try {
                this.serviceKeys.splice(0)

                console.log("service.fetchServiceKeys - this.id", this.id)
                const data = await axios.get('http://localhost:8080/api/services/' + this.id + "/keys")
                console.log("service.fetchServiceKeys - data", data)

                if (data.data != null) {
                    this.serviceKeys = data.data.map((data: any) => {
                        const newServiceKey: ServiceKeys = {
                            ServiceKeyId: data.ServiceKeyId,
                            KeyId: data.KeyId,
                            KeyName: data.Name,
                            KeyDescription: data.Description,
                            KeyTypeId: data.KeyTypeId,
                            KeyTypeName: data.KeyTypeName
                        }
                        return newServiceKey
                    })
                }
                console.log("service.fetchServiceKeys - serviceKeys", this.serviceKeys)
                // else {
                //     this.serviceKeys.splice(0)
                // }
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

        async addServiceKey() {
            const newServiceKey: ServiceKeys = {
                ServiceKeyId: 0,
                KeyId: 0,
                KeyName: "addServiceKey",
                KeyDescription: "",
                KeyTypeId: 0,
                KeyTypeName: ""
            }
            this.serviceKeys.push(newServiceKey)

            return newServiceKey.ServiceKeyId
        },

        async postServiceKey(serviceId: number, keyId: number) {
            const data = <JSON><unknown>{
                "KeyId": keyId,
                "ServiceId": serviceId
            }

            console.log("service.postServiceKey - data", data)
            try {
                await axios.post('http://localhost:8080/api/services/' + this.id + "/keys", data)

                console.log("service.postServiceKey - call fetchServiceKeys", this.serviceKeys)
                await this.fetchServiceKeys()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

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
    },
})
