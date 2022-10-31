import {defineStore} from 'pinia'
import axios from "axios"

export type KeyType = {
    Id: number;
    Name: string;
    Icon: string
}

// export type Cloud = {
//     Id: number;
//     Name: string;
//     Description: string;
//     CloudTypeId: number
// }

// export type Project = {
//     Id: number;
//     Name: string;
//     Description: string;
//     Icon: string
// }

export type ServiceProject = {
    Id: number;
    Name: string
}

export type Key = {
    Id: number;
    Name: string;
    Description: string;
    key_type_id: number;
    key_type_name: string;
    services: Array<ServiceProject>
}

export const useAllKeysStore = defineStore({
    id: "keys",

    state: () => ({
        keys: [] as Key[],
        keyTypes: [] as KeyType[],
        selectedKeyTypes: [] as number[],
        // clouds: [] as Cloud[],
        // selectedClouds: [] as number[],
        // projects: [] as Project[],
        selectedProjects: [] as number[]
    }),

    getters: {
        getKeys(state){
            return state.keys
        },
        getFilterKeys(state) {
            // function filterClouds(services: Key[], selectedClouds: number[]) {
            //     let result = [];
            //
            //     if (selectedClouds.length == 0) {
            //         return services
            //     }
            //     else {
            //         result = services.filter((el:Key) => {
            //             return selectedClouds.find((element:number) => {
            //                 return element == el.cloud_id;
            //             });
            //         });
            //     }
            //
            //     return result;
            // }

            function filterKeytypes(keys: Key[], selectedKeytypes: number[]) {
                let result = [];

                if (selectedKeytypes.length == 0) {
                    return keys
                }
                else {
                    result = keys.filter((el:Key) => {
                        return selectedKeytypes.find((element:number) => {
                            return element == el.key_type_id;
                        });
                    });
                }

                return result;
            }

            // function filterProjects(services: Key[], selectedProjects: number[]) {
            //     let result = [];
            //
            //     if (selectedProjects.length == 0) {
            //         return services
            //     }
            //     else {
            //         result = services.filter((service:Key) => {
            //             return selectedProjects.find((element:number) => {
            //                 return service.projects.find((serviceProject: ServiceProject) => {
            //                     return element == serviceProject.Id
            //                 });
            //             });
            //         });
            //     }
            //
            //     console.log("filter projects - result", result)
            //     return result;
            // }

            // let filterCloud = filterClouds(state.keys, state.selectedClouds)

            return filterKeytypes(state.keys, state.selectedKeyTypes);
        },
        getKeyById: (key) => {
            return (keyId: number) => key.keys.find((key) => key.Id === keyId)
        },
        getKeyTypes(state){
            return state.keyTypes
        },
        getSelectedKeyTypes(state) {
            return state.selectedKeyTypes
        },
        // getClouds(state){
        //     return state.clouds
        // },
        // getSelectedClouds(state) {
        //     return state.selectedClouds
        // },
        // getCloudById: (state) => {
        //     return (id: number) => state.clouds.find((clouds) => clouds.Id === id)
        // },
        // getProjects(state){
        //     return state.projects
        // },
        getSelectedProjects(state) {
            return state.selectedProjects
        }
    },
    actions: {
        async fetchKeys() {
            try {
                const data = await axios.get('http://localhost:8080/api/keys')
                this.keys = data.data.map((data: any) => {
                    const newKey: Key = {
                        Id: data.Id,
                        Name: data.Name,
                        Description: data.Description,
                        key_type_id: data.KeyTypeId,
                        key_type_name: data.KeyTypeName,
                        services: data.Services
                    }

                    return newKey
                })
            }
            catch (error) {
                alert(error)
                console.log("AllKeys", error)
            }
        },
        async fetchKeyTypes() {
            try {
                const data = await axios.get('http://localhost:8080/api/keytypes')
                this.keyTypes = data.data.map((data: any) => {
                    const newKeyType: KeyType = {
                        Id: data.Id,
                        Name: data.Name,
                        Icon: data.Icon
                    }
                    return newKeyType
                })
            }
            catch (error) {
                alert("KeyTypes: " + error)
                console.log(error)
            }
        },
        // async fetchClouds() {
        //     try {
        //         const data = await axios.get('http://localhost:8080/api/clouds')
        //         this.clouds = data.data.map((data: any) => {
        //             const newCloud: Cloud = {
        //                 Id: data.Id,
        //                 Name: data.Name,
        //                 Description: data.Description,
        //                 CloudTypeId: data.CloudTypeId
        //             }
        //             return newCloud
        //         })
        //     }
        //     catch (error) {
        //         alert("Clouds: " + error)
        //         console.log(error)
        //     }
        // },
        // async fetchProjects() {
        //     try {
        //         const data = await axios.get('http://localhost:8080/api/projects')
        //         this.projects = data.data.map((data: any) => {
        //             const newProject: Project = {
        //                 Id: data.Id,
        //                 Name: data.Name,
        //                 Description: data.Description,
        //                 Icon: data.Icon}
        //             return newProject
        //         })
        //     }
        //     catch (error) {
        //         alert("Projects: " + error)
        //         console.log(error)
        //     }
        // },
        async postKeys(name : string, description : string, keyType : number, keyPrivate : string, keyPublic : string) {
            const post = <JSON><unknown>{
                "name": name,
                "description": description,
                "keytype": keyType,
                "keyprivate": keyPrivate,
                "keypublic": keyPublic
            }
            console.log(post)

            try {
                await axios.post('http://localhost:8080/api/keys', post)

                await this.fetchKeys()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async deleteKey(id : number) {
            try {
                await axios.delete('http://localhost:8080/api/keys/' + id)

                await this.fetchKeys()
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})