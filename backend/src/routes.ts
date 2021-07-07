import { Router } from "express"
import { CompaniesController } from './controllers/companyController'

const routes = Router();

const companies = new CompaniesController()
routes.get('/',(req,res)=>{
    return res.status(200).send()
})

routes.get('/companies',companies.index)
routes.post('/companies',companies.create)


export default routes;