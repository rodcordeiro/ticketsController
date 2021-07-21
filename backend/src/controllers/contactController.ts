import { Request, Response } from 'express';
import { iContact, ContactServices } from '../Services/Contact';

class ContactController{
    async index(req: Request, res: Response){
        const services = new ContactServices()
        await services.list()
            .then(response =>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(400).json(error)
            })
    }
    async create(req: Request, res: Response){
        const services = new ContactServices()
        const {name,email,phone,loc_id}: iContact = req.body;

        await services.create(name,email,phone,loc_id)
            .then(response =>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(error.statusCode).json(error.error)
            })  
        
    }
}

export {
    ContactController
}