import instance from "./instance";
export interface IDirector {
        id?:number |undefined
        name:string
        image?:string
}
export const addDirector =async (director:IDirector)=>{
        
        return instance.post(`/directors`, director,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateDirector =async (director:IDirector)=>{
        
        return instance.patch(`/directors/${director.id}`, director,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeDirector =async (id:number|string)=>{
        
        return instance.delete(`/directors/${id}`)
        

}
export const getAllDirector = ()=>{
        return instance.get(`/directors`)

}
export const getDirectorById = (id:number|string)=>{
        return instance.get(`/directors/${id}`)

}