import { Request, Response } from 'express';
import { CompanyService,iCompany } from '../Services/Company'

class CompaniesController{
    async index(req: Request, res: Response): Promise<any>{
        const services= new CompanyService()
        await services.get_companies()
            .then((response: any)=>{
                return res.status(200).json(response)
            })
    }
    async create(req: Request, res: Response): Promise<any>{
        const services = new CompanyService()
        const { name, currency } = req.body;
        await services.create(name, currency)
            .then((response : any)=>{
                return res.status(201).json(response)
            })
            .catch(e=>{
                return res.status(e.statusCode).json(e.error)
            })
    }
}

export {
    CompaniesController
}