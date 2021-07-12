import connection from '../database/conection'
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
                const client = new ClientServices().findById(client_id)
                    .then((response) => response)
                    .catch(error=>{
                        reject({
                            statusCode: 400,
                            error
                        })
                    })
                resolve(client)
            } catch(error){
                reject({
                    statusCode: 500,
                    error
                })
                throw new Error(error)
            } 
        })
        
    }
}
export {
    iLocation,
    LocationServices
}