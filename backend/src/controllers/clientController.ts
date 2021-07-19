import { Request, Response } from 'express';
import { ClientServices, iClient } from '../Services/Clients';

class ClientController{
    async index(req: Request, res: Response){
        const services = new ClientServices();
        await services.listClients()
            .then((response: any)=>{
                return res.status(200).json(response)
            })
            .catch(error =>{
                return res.status(error.statusCode).json(error)
            })
    }
    async create(req: Request, res: Response){
        const services = new ClientServices();
        const {name, company_id} = req.body;
        if(!company_id){
            return res.status(400).json("company_id token missing")
        }
        await services.create({name, company_id})
            .then((response: any)=>{
                return res.status(201).json(response)
            })
            .catch(error =>{
                return res.status(error.statusCode).json(error)
            })
    }
    async delete(req: Request, res: Response){
        const services = new ClientServices();
        const { id } = req.params;

        await services.delete(id)
            .then(response=>{
                return res.status(204).send()
            })
            .catch(error =>{
                return res.status(error.statusCode).json(error)
            })
    }
}
export {
    ClientController
}
