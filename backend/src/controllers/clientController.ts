import { iClient } from '../intefaces/Interfaces'
import connection from '../database/conection'
import { Request, Response } from 'express';

const responseHandlers = {
    async createClient(req: Request, res: Response){
        const client = req.body
        const newClient = await clientHandler.add(client)
        if(newClient.status){
            return res.status(201).json(newClient.id)
        } else {
            return res.status(400).json(newClient.error)
        }
        
    },
}
const clientHandler = {
    async add(client: iClient){
        const company = await connection('companies')
            .select('*')
            .where('company_id',client.company_id)
            .first()
            .then((response: any)=>{
                return response;
            })
        if(!company){
            return {
                status: false,
                error: "Invalid company id"
            }
        }
        return await connection('clients')
            .insert(client)
            .then((response: any) =>{
                return {status: true, id: response}
            })
            .catch((error: any)=>{
                return {status: false,error}
            })
    },
    async getAll(){
        return await connection('clients')
            .select('*')
            .then((response: any) =>{
                return response
            })
    },
    async getClient(client_id: number){
        return await connection('clients')
            .select('*')
            .where('client_id',client_id)
            .first()
            .then((response: any) =>{
                return response
            })
    }
}
export {
    responseHandlers,
    clientHandler
}
