import instance from "./instance";
export interface IProduct {
        id?:number |undefined
        name: string;
        image: string;
        price: string;
        description: string;
}
export const addProduct =async (product:IProduct)=>{
        return instance.post(`/admin/products`, product,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateProduct  =async (product:IProduct)=>{
        
        return instance.patch(`/admin/products/${product.id}`, product,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeProduct=async (id:number|string)=>{
        
        return instance.delete(`/admin/products/${id}`)
        

}
export const getAllProduct = ()=>{
        return instance.get(`/admin/products`)

}
export const getProductById = (id:number|string)=>{
        return instance.get(`/admin/products/${id}`)

}