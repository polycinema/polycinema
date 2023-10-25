import instance from "./instance";
import axios from "axios"
export interface IGenre {
        id:number
        name:string
}
// axios.defaults.withCredentials=true
export const addGenre =async (genre:IGenre)=>{
        // await axios.get(`http://polycinema.test/sanctum/csrf-cookie`)
        return instance.post(`/genres`, genre,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const getGenre = ()=>{
        return instance.get(`/genres`)

}