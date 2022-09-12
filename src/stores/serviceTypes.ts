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
            try {
                const data = await axios.get('http://localhost:8080/api/servicetypes')
                this.serviceTypes = data.data.map((data: any) => {
                    const newServiceType: ServiceType = {Id: data.Id, Name: data.Name, Icon: data.Icon}
                    return newServiceType
                })

                console.log("new serviceTypes outputs", this.serviceTypes)
            }
            catch (error) {
                alert("ServiceTypes: " + error)
                console.log(error)
            }
        },
    },
})