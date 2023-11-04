import instance from "./instance";
export interface IRoom {

        room_name:string
        capacity: number
}
export const addRoom =async (room:IRoom)=>{

        return instance.post(`/rooms`, room,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateRoom =async (room:IRoom)=>{

        return instance.patch(`/rooms/${room.capacity}`, room,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeRoom =async (id:number|string)=>{

        return instance.delete(`/rooms/${id}`)


}
export const getAllRoom = ()=>{
        return instance.get(`/rooms`)

}
export const getRoomById = (id:number|string)=>{
        return instance.get(`/rooms/${id}`)

}
