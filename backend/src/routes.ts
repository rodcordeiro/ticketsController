import { Router } from "express"
import { CompaniesController } from './controllers/companyController'
import { ClientController } from './controllers/clientController'
import { LocationController } from './controllers/locationController';

const routes = Router();

const companies = new CompaniesController()
const clients = new ClientController()
const location = new LocationController()

routes.get('/',(req,res)=>{
    return res.status(200).send()
})

routes.get('/companies',companies.index)
routes.post('/companies',companies.create)
routes.delete('/companies',companies.delete)

routes.get('/client',clients.index)
routes.post('/client',clients.create)
routes.delete('/client',clients.delete)

routes.get('/location',location.index)
routes.post('/location',location.create)
routes.delete('/location/:loc_id',location.delete)


export default routes;