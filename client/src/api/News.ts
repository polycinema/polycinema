import instance from "./instance";
export interface INews {
        id?:number |undefined
        title: string;
        summary: string;
        description: string;
        image: string
}
export const addNews =async (news:INews)=>{
        return instance.post(`/posts`, news,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateNews =async (news:INews)=>{
        
        return instance.patch(`/posts/${news.id}`, news,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeNews=async (id:number|string)=>{
        
        return instance.delete(`/posts/${id}`)
        

}
export const getAllNews = ()=>{
        return instance.get(`/posts`)
}
export const getNewsById = (id:number|string)=>{
        return instance.get(`/posts/${id}`)

}