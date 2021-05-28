import { Router } from "express"
import * as LocController from './controllers/locationController'
import * as CompController from './controllers/companyController'
import * as ClientController from './controllers/clientController'

const routes = Router();

routes.get('/',(req,res)=>{
    return res.status(200).send()
})

routes.post('/locations',LocController.responseHandlers.createLocation)

routes.post('/company',CompController.responseHandlers.createCompany)

routes.post('/clients',ClientController.responseHandlers.createClient)

export default routes;