import { hash, compare } from "bcrypt"

export default class Cript{
    salt: number

    constructor( ){
        this.salt = 10
    }
    async hash(password: string){
        return await hash(password,this.salt).then(hash=>{
            return hash
        })
        .catch(err=>{
            throw new Error(err)
        })
    }
    async compare(password: string, hashed: any){
        password = await this.hash(password)
        
        return await compare(password, hashed)
        


    }

}
