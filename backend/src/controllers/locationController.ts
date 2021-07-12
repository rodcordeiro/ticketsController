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
        await services.create(name, address, city, state, client_id)
            .then(response=>{
                return res.status(200).json(response)
            })
            .catch(error=>{
                return res.status(error.statusCode).json(error.error)
            })
    }
}
export {
    LocationController
}