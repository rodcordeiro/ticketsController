import { v4 as uuid } from 'uuid';
import connection from '../database/conection';
interface iCompany{
    company_id?: number;
    name: string;
    currency: string;
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
                throw new Error(e)
                reject({
                    statusCode: 500,
                    error: e
                })
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
                .catch((e:any)=>{
                    reject(e)
                })
        })
    }
}

export {
    iCompany,
    CompanyService
}