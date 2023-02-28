import { defineStore } from 'pinia'
import axios from "axios"
import {ref} from "vue";

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
        serviceKeys: ref([] as ServiceKeys[]),
    }),
    getters: {
        getId(state) {
            return state.id
        },
        getName(state) {
            return state.name
        },
        getDescription(state) {
            return state.description
        },
        getAddress(state) {
            return state.address
        },
        getPort(state) {
            return state.port
        },
        getServiceTypeId(state) {
            return state.serviceTypeId
        },
        getCloudId(state) {
            return state.cloudId
        },
        getServiceKeys(state) {
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
            console.log("service.fetchServiceKeys - serviceKeys before", this.serviceKeys)
            try {
                const data = await axios.get('http://localhost:8080/api/services/' + this.id + "/keys")

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
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
            console.log("service.fetchServiceKeys - serviceKeys after", this.serviceKeys)
        },

        async addServiceKey() {
            console.log("service.addServiceKey - serviceKeys before", this.serviceKeys)
            const newServiceKey: ServiceKeys = {
                ServiceKeyId: 0,
                KeyId: 0,
                KeyName: "",
                KeyDescription: "",
                KeyTypeId: 0,
                KeyTypeName: ""
            }
            this.serviceKeys.push(newServiceKey)
            console.log("service.addServiceKey - serviceKeys after", this.serviceKeys)

            return newServiceKey.ServiceKeyId
        },

        async postServiceKey(serviceId: number, keyId: number) {
            const data = <JSON><unknown> {
                "KeyId": keyId,
                "ServiceId": serviceId
            }

            try {
                await axios.post('http://localhost:8080/api/services/' + this.id + "/keys", data)

                await this.fetchServiceKeys()
            }
            catch (error) {
                alert(error)
            }
        },

        async putServiceKey(serviceKeyId: number, serviceId: number, keyId: number) {
            const data = <JSON><unknown>{
                "ServiceId": serviceId,
                "KeyId": keyId
            }

            try {
                await axios.put('http://localhost:8080/api/services/' + serviceId + "/keys/" + serviceKeyId, data)

                await this.fetchService(this.id)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },

        async deleteServiceKey(serviceKeyId: number, serviceId: number) {
            console.log("service.deleteServiceKey - serviceKeyId", serviceKeyId)
            if (serviceKeyId == 0) {

            }
            else {
                try {
                    await axios.delete('http://localhost:8080/api/services/' + serviceId + "/keys/" + serviceKeyId)

                    await this.fetchServiceKeys()
                }
                catch (error) {
                    alert(error)
                    console.log(error)
                }
            }
        },

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
