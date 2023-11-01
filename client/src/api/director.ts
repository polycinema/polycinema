import instance from "./instance";
export interface IDirector {
        id?:number
        name:string,
        image:string
}
// axios.defaults.withCredentials=true
export const addDirector =async (director:IDirector)=>{
        // await axios.get(`http://polycinema.test/sanctum/csrf-cookie`)
        return instance.post(`/directors`, director,{
                headers:{
                        "Accept":"application/json"
                }
        })

}
