import instance from "./instance";
export interface IGenre {
        id:number
        name:string
}
export const addGenre =async (genre:IGenre)=>{
        
        return instance.post(`/admin/genres`, genre,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateGenre =async (genre:IGenre)=>{
        
        return instance.patch(`/admin/genres/${genre.id}`, genre,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeGenre =async (id:number|string)=>{
        
        return instance.delete(`/admin/genres/${id}`)
        

}
export const getAllGenre = ()=>{
        return instance.get(`/admin/genres`)

}
export const getGenreById = (id:number|string)=>{
        return instance.get(`/admin/genres/${id}`)

}