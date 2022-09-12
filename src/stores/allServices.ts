import { defineStore } from 'pinia'
import axios from "axios"

export type Project = {
    Id: number;
    Name: string
}

export type Service = {
    Id: number;
    Name: string;
    Description: string;
    address: string;
    port: string;
    service_type_id: number;
    service_type_name: string;
    cloud_id: number;
    cloud_name: string;
    projects: Array<Project>
}

export const useAllServicesStore = defineStore({
    id: "services",
    state: () => ({
        services: [] as Service[],
    }),
    getters: {
        getServices(state){
            return state.services
        },
        getServiceById: (service) => {
            return (serviceId: number) => service.services.find((service) => service.Id === serviceId)
        },
    },
    actions: {
        async fetchServices() {
            try {
                const data = await axios.get('http://localhost:8080/api/services')
                console.log("Original services", this.services)
                console.log("Raw services data", data.data)
                this.services = data.data.map((data: any) => {
                    console.log("id: " + data.Id, "name: " + data.Name)
                    const newService: Service = {
                        Id: data.Id,
                        Name: data.Name,
                        Description: data.Description,
                        address: data.Address,
                        port: data.Port,
                        service_type_id: data.ServiceTypeId,
                        service_type_name: data.ServiceTypeName,
                        cloud_id: data.CloudId,
                        cloud_name: data.CloudName,
                        projects: data.Projects
                    }
                    console.log("newService", newService.projects)
                    return newService
                })

                // this.scripts = data.data
                console.log("new services", this.services)
            }
            catch (error) {
                alert(error)
                console.log("AllServices", error)
            }
        },
        async postServices(name : string, description : string, code : string) {
            const post = <JSON><unknown>{
                "Name": name,
                "Description": description,
                "Code": code
            }

            try {
                await axios.post('http://localhost:8080/api/services', post)

                await this.fetchServices()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async deleteService(id : number) {
            try {
                await axios.delete('http://localhost:8080/api/services/' + id)

                await this.fetchServices()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})