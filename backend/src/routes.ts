import { Router } from "express"
import { CompaniesController } from './controllers/companyController'
import { ClientController } from './controllers/clientController'
import { LocationController } from './controllers/locationController';
import { ContactController } from "./controllers/contactController";
import { UserController } from "./controllers/UsersController";
import auth from './middlewares/auth';

const routes = Router();

const companies = new CompaniesController()
const clients = new ClientController()
const location = new LocationController()
const contacts = new ContactController();
const users = new UserController();

routes.get('/',(req,res)=>{
    return res.status(200).send()
})

routes.get('/companies',companies.index)
routes.post('/companies',companies.create)
routes.delete('/companies/:id',companies.delete)

routes.get('/client',clients.index)
routes.post('/client',clients.create)
routes.delete('/client/:id',clients.delete)

routes.get('/location',location.index)
routes.post('/location',location.create)
routes.delete('/location/:loc_id',location.delete)

routes.get('/contacts',contacts.index)
routes.post('/contacts',contacts.create)

routes.get('/users',users.index);
routes.post('/users',auth.validate, users.create);
routes.delete('/users/:id',auth.validate, users.delete);
routes.post('/auth',users.login);



export default routes;