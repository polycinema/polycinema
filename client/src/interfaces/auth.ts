export interface IAuth {
  id?: number|string,
  email: string,
  password: string | number,
  name?:string,
  role?:string
}
