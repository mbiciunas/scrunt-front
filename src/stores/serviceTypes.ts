import { defineStore } from 'pinia'
import axios from "axios"

export type ServiceType = { Id: number; Name: string; Icon: string }

export const useServiceTypeStore = defineStore({
    id: "servicetypes",
    state: () => ({
        serviceTypes: [] as ServiceType[],
    }),
    getters: {
        getServiceTypes(state){
            return state.serviceTypes
        },
        getServiceTypeById: (state) => {
            return (id: number) => state.serviceTypes.find((serviceTypes) => serviceTypes.Id === id)
        },
    },
    actions: {
        async fetchServiceTypes() {
            console.log('http://localhost:8080/api/servicetypes/')
            try {
                const data = await axios.get('http://localhost:8080/api/servicetypes/')
                console.log("Original serviceTypes", this.serviceTypes)
                console.log("Raw data", data.data)
                this.serviceTypes = data.data.map((data: any) => {
                    console.log("id: " + data.Id, "name: " + data.Name, "icon: " + data.Icon)
                    const newServiceType: ServiceType = {Id: data.Id, Name: data.Name, Icon: data.Icon}
                    console.log("newServiceType", newServiceType)
                    return newServiceType
                })

                // this.scripts = data.data
                console.log("new outputs", this.serviceTypes)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})