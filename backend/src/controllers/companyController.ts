import { iCompany } from '../intefaces/Interfaces'
import connection from '../database/conection'
import { Request, Response } from 'express';

const responseHandlers = {
    async createCompany(req: Request, res: Response){
        const company = req.body
        const newCompany = await companyHandler.add(company)
        if(newCompany.status){
            return res.status(201).json(newCompany.id)
        } else {
            return res.status(400).json(newCompany.error)
        }
        
    },
}
const companyHandler = {
    async add(company: iCompany){
        return await connection('companies')
            .insert(company)
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
    companyHandler
}
