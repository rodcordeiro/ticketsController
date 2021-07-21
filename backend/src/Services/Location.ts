import { v4 as uuid } from 'uuid';
import connection from '../database/conection'
import { iContact } from '../intefaces/Interfaces';
import { ClientServices } from './Clients';

interface iLocation{
    loc_id?: string;
    name: string,
    address: string,
    city: string,
    state: string,
    client_id: string
    created_at?: Date;
    updated_at?: Date;
}

class LocationServices{
    async list(){
        return new Promise(async (resolve,reject)=>{
            try{
                await connection("locations")
                    .select("*")
                    .then((response: Array<iLocation>)=>{
                        resolve(response)
                    })
                    .catch((error: any)=>{
                        reject({
                            statusCode: 400,
                            error
                        })
                    })
            }catch(error){
                reject({
                    statusCode: 500,
                    error
                })
                throw new Error(error)
            }
        })
    }
    async create(name: string, address: string, city: string, state: string, client_id: string){
        return new Promise(async (resolve,reject)=>{
            try{
                const cservices = new ClientServices()
                const client = await cservices.findById(client_id)
                    .then((response) => {
                        return response;
                    })
                    .catch((error)=>{
                        reject({
                            statusCode:400,
                            error
                        })
                    })
                
                const loc_id = uuid();
                await connection("locations")
                    .insert({name, address, city, state, client_id,loc_id})
                    .then((response: any) => {
                        resolve({
                            loc_id,
                            name,
                            address,
                            city,
                            state
                        })
                    })
                    .catch((error: any)=>{
                        reject({
                            statusCode:400,
                            error
                        })
                    })
                
            } catch(error){
                reject({
                    statusCode: 500,
                    error
                })
                throw new Error(error)
            } 
        })
        
    }
    async delete(loc_id: string){
        return new Promise( async (resolve,reject) : Promise<any>=>{
            try{
                await connection("locations")
                    .where({loc_id})
                    .first()
                    .delete()
                    .then((response : ResponseType) => {
                        resolve("")
                    })
                    .catch((error : ResponseType)=>{
                        reject({
                            statusCode:400,
                            error
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
    async findById(loc_id: string) : Promise<iContact>{
        return new Promise(async (resolve,reject) =>{
            try{
                await connection("locations")
                    .select("*")
                    .where({loc_id})
                    .then((response: any)=>{
                        if(response.length > 0) {
                           resolve(response)
                        } else {
                            reject({statusCode:400,error:"invalid location id"})
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
    iLocation,
    LocationServices
}