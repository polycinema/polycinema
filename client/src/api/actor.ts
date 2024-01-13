import instance from "./instance";
export interface IActor {
        id?:string|number|undefined
        name:string
        date_of_birth: string
        image: string
}
export const addActor =async (actor:IActor)=>{

        return instance.post(`/admin/actors`, actor,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateActor =async (actor:IActor)=>{

        return instance.patch(`/admin/actors/${actor.id}`, actor,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeActor =async (id:number|string)=>{

        return instance.delete(`/admin/actors/${id}`)


}
export const getAllActor = ()=>{
        return instance.get(`/admin/actors`)

}
export const getActorById = (id:number|string)=>{
        return instance.get(`/admin/actors/${id}`)

}
