import { defineStore } from 'pinia'
import axios from "axios"

export type Cloud = {
    Id: number;
    Name: string;
    Description: string;
    CloudTypeId: number
}

export type Project = {
    Id: number;
    Name: string;
    Description: string;
    Icon: string
}

export type ServiceProject = {
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
    projects: Array<ServiceProject>
}

export const useAllServicesStore = defineStore({
    id: "services",

    state: () => ({
        services: [] as Service[],
        clouds: [] as Cloud[],
        selectedClouds: [] as number[],
        projects: [] as Project[],
        selectedProjects: []
    }),

    getters: {
        getServices(state){
            return state.services
        },
        getFilterServices(state) {
            if (state.selectedClouds.length == 0) {
                return state.services
            }
            else {
                console.log("allServices.GetFilterServices - services", this.services)
                console.log("allServices.GetFilterServices - selectedClouds", state.selectedClouds)
                let res = [];
                res = state.services.filter(el => {
                    console.log("allServices.GetFilterServices - el.cloud_id", el.cloud_id)
                    return state.selectedClouds.find(element => {
                        return element == el.cloud_id;
                        // return element.Id === el.cloud_id;
                    });
                });
                console.log("allServices.GetFilterServices - result", res)
                return res;
            }
        },

        // getFilterServices(state){
        //     return state.services
        // },
        getServiceById: (service) => {
            return (serviceId: number) => service.services.find((service) => service.Id === serviceId)
        },
        getClouds(state){
            return state.clouds
        },
        getSelectedClouds(state) {
            return state.selectedClouds
        },
        getCloudById: (state) => {
            return (id: number) => state.clouds.find((clouds) => clouds.Id === id)
        },
        getProjects(state){
            return state.projects
        },
        getSelectedProjects(state) {
            console.log("Filter Projects", state.selectedProjects)
            return state.selectedProjects
        }
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
                    // console.log("newService", newService.projects)
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
        async fetchClouds() {
            try {
                const data = await axios.get('http://localhost:8080/api/clouds')
                this.clouds = data.data.map((data: any) => {
                    const newCloud: Cloud = {Id: data.Id, Name: data.Name, Description: data.Description, CloudTypeId: data.CloudTypeId}
                    return newCloud
                })

                console.log("new clouds outputs", this.clouds)
            }
            catch (error) {
                alert("Clouds: " + error)
                console.log(error)
            }
        },
        async fetchProjects() {
            try {
                const data = await axios.get('http://localhost:8080/api/projects')
                this.projects = data.data.map((data: any) => {
                    const newProject: Project = {Id: data.Id, Name: data.Name, Description: data.Description, Icon: data.Icon}
                    return newProject
                })

                console.log("new projects outputs", this.projects)
            }
            catch (error) {
                alert("Projects: " + error)
                console.log(error)
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