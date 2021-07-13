import { Request, Response } from 'express';
import { LocationServices, iLocation } from '../Services/Location'

class LocationController{
    async index(req: Request, res: Response){
        const services = new LocationServices()
        await services.list()
            .then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(error.statusCode).json(error.error)
            })
    }
    async create(req: Request, res: Response){
        const services = new LocationServices()
        const {name, address, city, state, client_id} = req.body
        if(!name) return res.status(400).json({error: "You must provide a Name for the location"});
        if(!address) return res.status(400).json({error: "You must provide the location's address"});
        if(!city) return res.status(400).json({error:  "You must provide the location's city"});
        if(!state) return res.status(400).json({error:  "You must provide the location's state"});
        if(!client_id) return res.status(400).json({error: "You must provide client id of location"});
        await services.create(name, address, city, state, client_id)
            .then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(error.statusCode).json(error.error)
            })
    }
    async delete(req: Request, res: Response){
        const services = new LocationServices();
        const {loc_id} = req.params;
        await services.delete(loc_id)
        .then(response=>{
            return res.status(204).send()
        })
        .catch(error=>{
            return res.status(error.statusCode).json(error.error)
        })
    }
}
export {
    LocationController
}