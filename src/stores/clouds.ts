import { defineStore } from 'pinia'
import axios from "axios"

export type Cloud = { Id: number; Name: string; Description: string; CloudTypeId: number }

export const useCloudStore = defineStore({
    id: "clouds",
    state: () => ({
        clouds: [] as Cloud[],
    }),
    getters: {
        getClouds(state){
            return state.clouds
        },
        getCloudById: (state) => {
            return (id: number) => state.clouds.find((clouds) => clouds.Id === id)
        },
    },
    actions: {
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
    },
})