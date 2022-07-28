import { defineStore } from 'pinia'
import axios from "axios"

export type Output = { Id: number; RunId: number; OutputType: number; OutputValue: string }

export const useOutputStore = defineStore({
    id: "outputs",
    state: () => ({
        outputs: [] as Output[],
    }),
    getters: {
        getOutputs(state){
            return state.outputs
        },
        getScriptById: (state) => {
            return (runId: number) => state.outputs.find((outputs) => outputs.RunId === runId)
        },
    },
    actions: {
        async fetchOutputs(runId: number, id: number) {
            console.log('http://localhost:8080/api/outputs/script/' + runId + '/' + id)
            try {
                const data = await axios.get('http://localhost:8080/api/outputs/script/' + runId + '/' + id)
                console.log("Original scripts", this.outputs)
                console.log("Raw data", data.data)
                this.outputs = data.data.map((data: any) => {
                    console.log("id: " + data.Id, "name: " + data.OutputValue)
                    const newOutput: Output = {Id: data.Id, RunId: data.RunId, OutputType: data.OutputType, OutputValue: data.OutputValue}
                    console.log("newOutput", newOutput)
                    return newOutput
                })

                // this.scripts = data.data
                console.log("new outputs", this.outputs)
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },
})