import instance from "./instance";
export interface IBanner {
        id?:number |undefined
        name: string
}
export const addBanner =async (name:IBanner)=>{
        return instance.post(`/admin/banners`, name,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateBanner =async (name:IBanner)=>{
        
        return instance.patch(`/admin/banners/${name.id}`, name,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeBanner=async (id:number|string)=>{
        
        return instance.delete(`/admin/banners/${id}`)
        

}
export const getAllBanner = ()=>{
        return instance.get(`/admin/banners`)
}
export const getBannerById = (id:number|string)=>{
        return instance.get(`/admin/banners/${id}`)

}