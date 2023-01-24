import {defineStore} from 'pinia'
import axios from "axios"

export type ServiceType = {
    Id: number;
    Name: string;
    Icon: string
}

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
        serviceTypes: [] as ServiceType[],
        selectedServiceTypes: [] as number[],
        clouds: [] as Cloud[],
        selectedClouds: [] as number[],
        projects: [] as Project[],
        selectedProjects: [] as number[]
    }),

    getters: {
        getServices(state){
            return state.services
        },
        getFilterServices(state) {
            function filterClouds(services: Service[], selectedClouds: number[]) {
                let result = [];

                if (selectedClouds.length == 0) {
                    return services
                }
                else {
                    result = services.filter((el:Service) => {
                        return selectedClouds.find((element:number) => {
                            return element == el.cloud_id;
                        });
                    });
                }

                return result;
            }

            function filterServicetypes(services: Service[], selectedServicetypes: number[]) {
                let result = [];

                if (selectedServicetypes.length == 0) {
                    return services
                }
                else {
                    result = services.filter((el:Service) => {
                        return selectedServicetypes.find((element:number) => {
                            return element == el.service_type_id;
                        });
                    });
                }

                return result;
            }

            function filterProjects(services: Service[], selectedProjects: number[]) {
                let result = [];

                if (selectedProjects.length == 0) {
                    return services
                }
                else {
                    result = services.filter((service:Service) => {
                        return selectedProjects.find((element:number) => {
                            return service.projects.find((serviceProject: ServiceProject) => {
                                return element == serviceProject.Id
                            });
                        });
                    });
                }

                return result;
            }

            let filterCloud = filterClouds(state.services, state.selectedClouds)

            let filterServiceType = filterServicetypes(filterCloud, state.selectedServiceTypes);

            return filterProjects(filterServiceType, state.selectedProjects)
        },
        getServiceById: (service) => {
            return (serviceId: number) => service.services.find((service) => service.Id === serviceId)
        },
        getServiceByType: (service) => {
            return (typeId: number) => service.services.filter((service) => service.service_type_id === typeId)
        },
        getServiceTypes(state){
            return state.serviceTypes
        },
        getSelectedServiceTypes(state) {
            return state.selectedServiceTypes
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
            return state.selectedProjects
        }
    },
    actions: {
        async fetchServices() {
            try {
                const data = await axios.get('http://localhost:8080/api/services')
                this.services = data.data.map((data: any) => {
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

                    return newService
                })
            }
            catch (error) {
                alert(error)
                console.log("AllServices", error)
            }
        },
        async fetchServiceTypes() {
            try {
                const data = await axios.get('http://localhost:8080/api/servicetypes')
                this.serviceTypes = []
                this.serviceTypes.push({ Id: 0, Name: "Select a Service", Icon: "" })
                this.serviceTypes = this.serviceTypes.concat(data.data.map((data: any) => {
                    const newServiceType: ServiceType = {
                        Id: data.Id,
                        Name: data.Name,
                        Icon: data.Icon
                    }
                    return newServiceType
                }))
            }
            catch (error) {
                alert("ServiceTypes: " + error)
                console.log(error)
            }
        },
        async fetchClouds() {
            try {
                const data = await axios.get('http://localhost:8080/api/clouds')
                this.clouds = data.data.map((data: any) => {
                    const newCloud: Cloud = {
                        Id: data.Id,
                        Name: data.Name,
                        Description: data.Description,
                        CloudTypeId: data.CloudTypeId
                    }
                    return newCloud
                })
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
                    const newProject: Project = {
                        Id: data.Id,
                        Name: data.Name,
                        Description: data.Description,
                        Icon: data.Icon}
                    return newProject
                })
            }
            catch (error) {
                alert("Projects: " + error)
                console.log(error)
            }
        },
        // async postServices(name : string, description : string, code : string) {
        //     const post = <JSON><unknown>{
        //         "Name": name,
        //         "Description": description,
        //         "Code": code
        //     }
        //
        //     try {
        //         await axios.post('http://localhost:8080/api/services', post)
        //
        //         await this.fetchServices()
        //     }
        //     catch (error) {
        //         alert(error)
        //         console.log(error)
        //     }
        // },
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