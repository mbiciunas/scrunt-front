import { defineStore } from 'pinia'
import axios from "axios"
import {ref} from "vue";

export type KeyServices = {
    ServiceKeyId: number;
    ServiceId: number;
    ServiceName: string;
    ServiceDescription: string;
    ServiceTypeId: number;
    ServiceTypeName: string;
}

export const useKeyStore = defineStore({
    id: "key",
    state: () => ({
        id: 0,
        name: "",
        description: "",
        type: "",
        keyPrivate: "",
        keyPublic: "",
        keyServices: ref([] as KeyServices[]),
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
        getType(state){
            return state.type
        },
        getKeyPrivate(state){
            return state.keyPrivate
        },
        getKeyPublic(state){
            return state.keyPublic
        },
    },
    actions: {
        async fetchKey(id: number) {
            try {
                await console.log("fetchKey start get")

                const data = await axios.get('http://localhost:8080/api/keys/' + id)
                await console.log("fetchKey end get")
                this.id = await data.data.Id
                this.name = await data.data.Name
                this.description = await data.data.Description
                this.type = await data.data.Type
                this.keyPrivate = await data.data.KeyPrivate
                this.keyPublic = await data.data.KeyPublic

                console.log("Data", data.data)
                console.log("New Id", this.id)
                console.log("New Name", this.name)
                console.log("New Description", this.description)
                console.log("New Type", this.type)
                console.log("New Private", this.keyPrivate)
                console.log("New Public", this.keyPublic)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

        async fetchKeyServices() {
            console.log("key.fetchKeyServices - keyServices before", this.keyServices)
            try {
                const data = await axios.get('http://localhost:8080/api/keys/' + this.id + "/services")

                if (data.data == null) {
                    this.keyServices.splice(0, this.keyServices.length)
                }
                else {
                    this.keyServices = data.data.map((data: any) => {
                        const newKeyService: KeyServices = {
                            ServiceKeyId: data.ServiceKeyId,
                            ServiceId: data.ServiceId,
                            ServiceName: data.Name,
                            ServiceDescription: data.Description,
                            ServiceTypeId: data.ServiceTypeId,
                            ServiceTypeName: data.ServiceTypeName
                        }
                        return newKeyService
                    })
                }
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
            console.log("key.fetchKeyServices - keyServices after", this.keyServices)
        },

        async addKeyService() {
            console.log("key.addServiceKey - keyServices before", this.keyServices)
            const newKeyService: KeyServices = {
                ServiceKeyId: 0,
                ServiceId: 0,
                ServiceName: "",
                ServiceDescription: "",
                ServiceTypeId: 0,
                ServiceTypeName: ""
            }
            this.keyServices.push(newKeyService)
            console.log("key.addServiceKey - keyServices after", this.keyServices)

            return newKeyService.ServiceKeyId
        },

        async postServiceKey(keyId: number, serviceId: number) {
            const data = <JSON><unknown> {
                "KeyId": keyId,
                "ServiceId": serviceId
            }

            try {
                await axios.post('http://localhost:8080/api/keys/' + this.id + "/services", data)

                await this.fetchKeyServices()
            }
            catch (error) {
                alert(error)
            }
        },

        async putServiceKey(serviceKeyId: number, keyId: number, serviceId: number) {
            const data = <JSON><unknown>{
                "ServiceId": serviceId,
                "KeyId": keyId
            }

            try {
                await axios.put('http://localhost:8080/api/keys/' + this.id + "/services/" + serviceKeyId, data)

                await this.fetchKeyServices()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

        async deleteKeyService(serviceKeyId: number, serviceId: number) {
            console.log("key.deleteKeyService - serviceKeyId", serviceKeyId)
            if (serviceKeyId == 0) {
                const indexOfObject = this.keyServices.findIndex((object) => {
                    return object.ServiceKeyId === serviceKeyId;
                });
                if (indexOfObject !== -1) {
                    this.keyServices.splice(indexOfObject, 1);
                }
            }
            else {
                try {
                    await axios.delete('http://localhost:8080/api/services/' + serviceId + "/keys/" + serviceKeyId)

                    await this.fetchKeyServices()
                }
                catch (error) {
                    alert(error)
                    console.log(error)
                }
            }
        },

        async putNameDescription(name: string, description: string) {
            console.log("Put Private", this.keyPrivate)
            console.log("Put Public", this.keyPublic)
            const data = <JSON><unknown>{
                "Name": name,
                "Description": description,
                "Type": this.type,
                "KeyPrivate": this.keyPrivate,
                "KeyPublic": this.keyPublic,
            }

            try {
                await axios.put('http://localhost:8080/api/keys/' + this.id, data)

                await this.fetchKey(this.id)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async putKey(type: number, keyPublic: string, keyPrivate: string) {
            console.log("key.ts:putKey")
            const data = <JSON><unknown>{
                "Name": this.name,
                "Description": this.description,
                "Type": type,
                "KeyPublic": keyPublic,
                "KeyPrivate": keyPrivate,
            }

            console.log(data)

            try {
                await axios.put('http://localhost:8080/api/keys/' + this.id, data)

                await this.fetchKey(this.id)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})
