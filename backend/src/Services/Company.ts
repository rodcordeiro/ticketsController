import { v4 as uuid } from 'uuid';
import connection from '../database/conection';
interface iCompany{
    company_id?: number;
    name: string;
    currency: string;
    created_at?: Date;
    updated_at?: Date;
}

class CompanyService {
    async create(name: string, currency: string){
        return new Promise( async(resolve,reject)=>{
            try{
                const company_id = uuid()
                await connection('companies')
                    .insert({company_id,name,currency})
                    .then((response : any)=>{
                        resolve({company_id,name})
                    })
                    .catch((e: any)=>{
                        reject({
                            statusCode: 400,
                            error: e
                        })
                    })
            } catch(e){
                reject({
                    statusCode: 500,
                    error: e
                })
                throw new Error(e)
                
            }
        })
    }
    async get_companies(){
        return new Promise(async (resolve,reject)=>{
            await connection('companies')
                .select('*')
                .then((response:Array<iCompany>)=>{
                    resolve(response)
                })
                .catch((e: any)=>{
                    reject({
                        statusCode: 400,
                        error: e
                    })
                })
        })
    }
    async delete(company_id : string){
        return new Promise(async (resolve, reject)=>{
            try{
                await connection('companies')
                    .where({company_id})
                    .delete()
                    .then((response: any)=>{
                        resolve("")
                    })
                    .catch((e: any)=>{
                        reject({
                            statusCode: 400,
                            error: e
                        })
                    })
            } catch(e){
                reject({
                    statusCode: 500,
                    error: e
                })
                throw new Error(e)
            }
        })
    }
}

export {
    iCompany,
    CompanyService
}