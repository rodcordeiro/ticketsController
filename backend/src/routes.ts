import { Router } from "express"
import { CompaniesController } from './controllers/companyController'
import { ClientController } from './controllers/clientController'

const routes = Router();

const companies = new CompaniesController()
const clients = new ClientController()

routes.get('/',(req,res)=>{
    return res.status(200).send()
})

routes.get('/companies',companies.index)
routes.post('/companies',companies.create)

routes.get('/client',clients.index)
routes.post('/client',clients.create)
routes.delete('/client',clients.delete)

export default routes;