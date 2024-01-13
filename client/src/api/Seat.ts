import instance from "./instance";
export interface ISeat {
        id?:number | undefined
        seat_name: string;
        // room_id: number;
        price:number,
        showtime_id:number,
}
export const addSeat =async (Seat:ISeat)=>{
        return instance.post(`/admin/seats`, Seat,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const updateSeat =async (Seat:ISeat)=>{
        
        return instance.patch(`/admin/seats/${Seat.id}`, Seat,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
export const removeSeat=async (id:number|string)=>{
        
        return instance.delete(`/admin/seats/${id}`)
        

}
export const getAllSeat = ()=>{
        return instance.get(`/admin/seats`)

}
export const getSeatById = (id:number|string)=>{
        return instance.get(`/admin/seats/${id}`)

}