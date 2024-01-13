import instance from "./instance";
export interface IDirector {
        id?:number |undefined
        name:string
        image?:string
}
export const getSoftDirector = ()=>{
        return instance.get(`/director-in-trash`)
}
export const softDeleteDirector =async (director_id:number | string)=>{
        return instance.post(`/change-level-director`, director_id,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const addDirector =async (director:IDirector)=>{
        
        return instance.post(`/admin/directors`, director,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateDirector =async (director:IDirector)=>{
        return instance.patch(`/admin/directors/${director.id}`, director,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeDirector =async (id:number|string)=>{
        return instance.delete(`/admin/directors/${id}`)
}
export const getAllDirector = ()=>{
        return instance.get(`/admin/directors`)
}
export const getDirectorById = (id:number|string)=>{
        return instance.get(`/admin/directors/${id}`)
}