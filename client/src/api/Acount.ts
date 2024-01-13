import axios from "axios";
import instance from "./instance";
export interface ICount {
        id:number
        name: string;
        email: string;
        password: string;
        role: string
}
export const addAcount =async (acount:ICount)=>{
        
        return instance.post(`/admin/users`, acount,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateAcount =async (acount:ICount)=>{
        
        return instance.patch(`/admin/users/${acount.id}`, acount,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeAcount =async (id:number|string)=>{
        
        return instance.delete(`/admin/users/${id}`)
        

}
export const getAllAcount = ()=>{
        return instance.get(`/admin/users`)

}
export const getAllAcountUsers = ()=>{
        return axios.get('http://localhost:8000/api/v1/customers')
}
export const getAllAcountAdmin = ()=>{
        return axios.get('http://localhost:8000/api/v1/users-admin')
}

export const getAcounteById = (id:number|string)=>{
        return instance.get(`/admin/users/${id}`)

}
