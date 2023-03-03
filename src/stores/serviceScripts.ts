import { defineStore } from 'pinia'
import axios from "axios"
import {ref} from "vue";

export type ServiceScripts = {
    ScriptId: number;
    ScriptName: string;
    ScriptDescription: string;
}

export const useServiceScriptStore = defineStore({
    id: "serviceScript",
    state: () => ({
        id: 0,
        serviceScripts: ref([] as ServiceScripts[]),
    }),
    getters: {
        getId(state) {
            return state.id
        },
        getServiceScripts(state) {
            return state.serviceScripts
        },
    },
    actions: {
        async fetchServiceScripts(id: number) {
            console.log("serviceScripts.fetchServiceScripts - serviceScripts before", this.serviceScripts)
            try {
                const data = await axios.get('http://localhost:8080/api/services/' + id + "/scripts")
                console.log("serviceScripts.fetchServiceScripts - data", data)

                if (data.data == null) {
                    this.serviceScripts.splice(0, this.serviceScripts.length)
                }
                else {
                    this.serviceScripts = data.data.map((data: any) => {
                        const newServiceScript: ServiceScripts = {
                            ScriptId: data.ScriptId,
                            ScriptName: data.ScriptName,
                            ScriptDescription: data.ScriptDescription,
                        }
                        return newServiceScript
                    })
                }
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
            console.log("serviceScripts.fetchServiceScripts - serviceScripts after", this.serviceScripts)
        },
    },
})
