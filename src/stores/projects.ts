import { defineStore } from 'pinia'
import axios from "axios"

export type Project = { Id: number; Name: string; Description: string; Icon: string }

export const useProjectStore = defineStore({
    id: "projects",
    state: () => ({
        projects: [] as Project[],
    }),
    getters: {
        getProjects(state){
            return state.projects
        },
        getProjectById: (state) => {
            return (id: number) => state.projects.find((projects) => projects.Id === id)
        },
    },
    actions: {
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
    },
})