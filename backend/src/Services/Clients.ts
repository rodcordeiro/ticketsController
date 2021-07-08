import connection from '../database/conection';
import { v4 as uuid } from 'uuid';

interface iClient{
    client_id?: number;
    name: string;
    company_id: number;
    created_at?: Date;
    updated_at?: Date;
}
class ClientServices {
    async create(data: iClient){
        return new Promise(async (resolve, reject)=>{
            try{
                const {name, company_id} = data
                const client = await connection('clients')
                    .select("*")
                    .where({name})
                    .first()
                    .then((response: any) => {
                        return response
                    })
                    .catch((error: any)=>{
                        reject({
                            statusCode: 400,
                            error
                        })
                    })
                if(client){
                    reject({
                        statusCode: 400,
                        error:"Client name already exists"
                    })
                    throw new Error("Client name already exists")
                }
                const client_id = uuid()
                await connection('clients')
                    .insert({
                        client_id,
                        name,
                        company_id
                    })
                    .then((response: any) =>{
                        resolve({client_id,name})
                    }).catch((error: any)=>{
                        reject({
                            statusCode: 400,
                            error
                        })
                    })
            
            } catch (error){
                reject({
                    statusCode: 500,
                    error
                })
            }
            })
    }
    async listClients(){
        return new Promise(async (resolve,reject)=>{
            try{
                await connection('clients')
                    .select("*")
                    .then((response: Array<iClient>)=>{
                        resolve(response)
                    })
                    .catch((error: any)=>{
                        reject({
                            statusCode: 400,
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
    async delete(client_id: string){
        return new Promise(async (resolve,reject)=>{
            try{
                await connection('clients')
                    .where({client_id})
                    .first()
                    .delete()
                    .then((response: any)=>{
                        resolve("")
                    })
                    .catch((error: any)=>{
                        reject({
                            statusCode: 400,
                            error
                        })
                    })
            } catch (error){
                reject({
                    statusCode: 500,
                    error
                })
            }
        })
    }
}

export {
    iClient,
    ClientServices
}