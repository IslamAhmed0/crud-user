export interface user {
  id?:string,
  name:string,
  email:string,
  password:string,
  salt?:number,
  gender: 'male'|'female';

}