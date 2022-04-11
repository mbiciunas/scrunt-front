// stores/users.js
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export type User = { Id: number; Name: string; Script: string }

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        users: [] as User[],
    }),
    getters: {
        getUsers(state){
            return state.users
        }
    },
    actions: {
        async fetchUsers() {
            try {
                // const data = await axios.get('https://jsonplaceholder.typicode.com/users')
                const data = await axios.get('http://localhost:8080/api/scripts')
                this.users = data.data
            }
            catch (error) {
                alert(error)
                console.log(error)
            }
            console.log(this.users)
        }
    },
})