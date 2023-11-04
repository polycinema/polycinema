import instance from "./instance";
export interface ICount {
        id:number
        name: string;
        email: string;
        password: string;
        role: string
}
export const addAcount =async (acount:ICount)=>{
        
        return instance.post(`/users`, acount,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateAcount =async (acount:ICount)=>{
        
        return instance.patch(`/users/${acount.id}`, acount,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeAcount =async (id:number|string)=>{
        
        return instance.delete(`/users/${id}`)
        

}
export const getAllAcount = ()=>{
        return instance.get(`/users`)

}

export const getAcounteById = (id:number|string)=>{
        return instance.get(`/users/${id}`)

}
