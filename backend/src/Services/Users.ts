import connection from '../database/conection';
import jwt from "jsonwebtoken";
import Cript from '../Utils/cript';
import { v4 as uuid } from 'uuid';

const cript = new Cript();

const secret = process.env.APP_SECRET || "secret"

interface iUser{
    user_id?: string;
    name?: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
class UserService{
    async list(){
        return new Promise(async (resolve, reject)=>{
            await connection("users")
                .select(
                    "user_id",
                    "name",
                    "email",
                    "isAdmin",
                    "created_at",
                    "updated_at"
              )
                .then((response: Array<iUser>) => {
                    resolve(response)
                })
                .catch((error:any)=>{
                    reject({
                        statusCode: 500,
                        error
                    })
                })
        })
    }
    async create(name: string,email: string,password: any,isAdmin: boolean){
        return new Promise(async (resolve,reject)=>{
            const user = await this.findByEmail(email)
                .then(response=>{
                    reject({
                        statusCode: 400,
                        error:"Email already registered"
                    })
                    return true
                })
                .catch(error=>{
                    return false
                })
            if (user) throw new Error("Email already registered");
            password = await cript.hash(password)
                .then(hash=>  {
                    return hash
                })
                .catch((error:any)=>{
                    reject({
                        statusCode: 500,
                        error
                    })
                })
            const user_id = uuid()
            await connection("users")
                .insert({user_id, name, email, password, isAdmin})
                .then((response: any)=>{
                    resolve({
                        id: user_id,
                        name,
                        email
                    })
                })
                .catch((error:any)=>{
                    console.log(error)
                    reject({
                        statusCode: 400,
                        error
                    })
                })
        })
    }
    async delete(user_id: string ){
        return new Promise(async (resolve,reject)=>{
            try {
                await connection('users')
                    .where({user_id})
                    .first()
                    .delete()
                    .then((response: any)=>{
                        resolve("")
                    })
                    .catch((error:any)=>{
                        reject({
                            statusCode: 400,
                            error
                        })
                    })
            } catch (error) {
                reject({
                    statusCode: 500,
                    error
                })
            }
        })
    }
    async login(email: string, password: string){
        return new Promise(async (resolve, reject)=>{
            try{
                const user = await this.findByEmail(email)
                    .then((response: iUser)=>{
                        return response
                     })
                     .catch((error: any)=>{
                         reject({ statusCode: 400, error})
                     })
                if(!user) return;
                
                const validate = await cript.compare(password,user.password)
                     .then(async(response)=>{
                        const token = await this.signin(user.user_id,user.isAdmin)
                        resolve({token})
                     })
                     .catch(error=>{
                         reject({
                             statusCode: 400,
                             error: "Invalid password"
                         })
                     })

            } catch(error){
                reject({
                    statusCode: 500,
                    error
                })
            }
        })
    }

    private async signin(id : any, isAdmin: any){
        return jwt.sign({id,isAdmin},secret,{expiresIn:"15 days"});
    }
    async findById(contact_id: string) : Promise<iUser>{
        return new Promise(async (resolve,reject) =>{
            try{
                await connection("users")
                    .select("*")
                    .first()
                    .where({contact_id})
                    .then((response: any)=>{
                        if(response.length > 0) {
                           resolve(response)
                        } else {
                            reject("invalid user id")
                        }
                    })
                    .catch((error:any)=>{
                        reject({
                            statusCode: 500,
                            error
                        })
                    })
            }catch(error){
                reject({
                    statusCode: 500,
                    error
                })
            }
            
        })
    }
    async findByEmail(email: string) : Promise<iUser>{
        return new Promise(async (resolve,reject) =>{
            try{
                await connection("users")
                    .select("*")
                    .where({email})
                    .first()
                    .then((response: any)=>{
                           resolve(response)
                        
                    })
                    .catch((error:any)=>{
                        reject({
                            statusCode: 500,
                            error
                        })
                    })
            }catch(error){
                reject({
                    statusCode: 500,
                    error
                })
            }
            
        })
    }
}

export {
    iUser,
    UserService
}