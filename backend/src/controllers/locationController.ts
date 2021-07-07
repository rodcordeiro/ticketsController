import { iLocation } from '../intefaces/Interfaces'
import connection from '../database/conection'
import { Request, Response } from 'express';

const responseHandlers = {
    async createLocation(req: Request, res: Response){
        const location = req.body
        const newLoc = await locationHandler.add(location)
        if(newLoc.status){
            return res.status(201).json(newLoc.id)
        } else {
            return res.status(400).json(newLoc.error)
        }
        
    },
}
const locationHandler = {
    async add(location: iLocation){
        const client = await connection('clients')
            .select('*')
            .where('client_id',location.client_id)
            .first()
            .then((response: any)=>{
                return response;
            })
        if(!client){
            return {
                status: false,
                error: "Invalid client id"
            }
        }
        return await connection('locations')
            .insert(location)
            .then((response: any) =>{
                return {status: true, id: response}
            })
            .catch((error: any)=>{
                return {status: false,error}
            })
    }
}
export {
    responseHandlers,
    locationHandler
}
