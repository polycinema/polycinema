import instance from "./instance";
export interface IProduct {
        id?:number |undefined
        name: string;
        image: string;
        price: string;
        description: string;
}
export const addProduct =async (product:IProduct)=>{
        return instance.post(`/products`, product,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateProduct  =async (product:IProduct)=>{
        
        return instance.patch(`/products/${product.id}`, product,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeProduct=async (id:number|string)=>{
        
        return instance.delete(`/products/${id}`)
        

}
export const getAllProduct = ()=>{
        return instance.get(`/products`)

}
export const getProductById = (id:number|string)=>{
        return instance.get(`/products/${id}`)

}