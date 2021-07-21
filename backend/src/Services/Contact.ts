import connection from '../database/conection';
import { v4 as uuid} from 'uuid';
import { LocationServices } from './Location';
interface iContact{
    contact_id?: string;
    name: string;
    email: string;
    phone: string;
    loc_id: string;
    created_at?: Date;
    updated_at?: Date;
}
class ContactServices{
    async list(){
        return new Promise(async (resolve,reject)=>{
            try{
                await connection("contacts")
                    .select("*")
                    .then((response: Array<iContact>)=>{
                        resolve(response)
                    })
                    .catch((e:any)=>{
                        reject(e)
                    })
            } catch (error){
                reject(error)
            }
        })
    }
    async create(name: string,email: string,phone: string,loc_id: string){
        return new Promise(async (resolve,reject)=>{
            const location = await new LocationServices()
                .findById(loc_id)
                .then((response=>{
                    return response
                }))
                .catch((error)=>{
                    reject(error)
                    throw new Error(error)
                })
            const contact = await this.findByEmail(email)
                .then((response=>{
                    reject({statusCode:400,error:"Email already registered"})
                    return response
                }))
                .catch((error)=>{
                    return
                })
            if (contact || !location ) return;
            const contact_id = uuid()
            await connection("contacts")
                .insert({
                    contact_id,
                    name,
                    email,
                    phone,
                    loc_id
                })
                .then((response:any)=>{
                    resolve({
                        contact_id,
                        name,
                        
                    })
                })
                .catch((error:any)=>{
                    reject({
                        statusCode: 400,
                        error
                    })
                })
                
        })
    }
    async findById(contact_id: string) : Promise<iContact>{
        return new Promise(async (resolve,reject) =>{
            try{
                await connection("contacts")
                    .select("*")
                    .where({contact_id})
                    .then((response: any)=>{
                        if(response.length > 0) {
                           resolve(response)
                        } else {
                            reject("invalid contact id")
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
    async findByEmail(email: string) : Promise<iContact>{
        return new Promise(async (resolve,reject) =>{
            try{
                await connection("contacts")
                    .select("*")
                    .where({email})
                    .then((response: any)=>{
                        if(response.length > 0) {
                           resolve(response)
                        } else {
                            reject("Contact not found")
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
}

export {
    iContact,
    ContactServices
}