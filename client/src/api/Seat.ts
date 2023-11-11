import instance from "./instance";
export interface ISeat {
        id?:number | undefined
        seat_name: string;
        room_id: number;
       
}
export const addSeat =async (Seat:ISeat)=>{
        return instance.post(`/seats`, Seat,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateSeat =async (Seat:ISeat)=>{
        
        return instance.patch(`/seats/${Seat.id}`, Seat,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeSeat=async (id:number|string)=>{
        
        return instance.delete(`/seats/${id}`)
        

}
export const getAllSeat = ()=>{
        return instance.get(`/seats`)

}
export const getSeatById = (id:number|string)=>{
        return instance.get(`/seats/${id}`)

}