import { iUser, UserService } from "../Services/Users";
import { Request, Response } from 'express';

class UserController{
    async index(req: Request, res: Response){
        const services = new UserService();
        await services.list()
            .then((response) => {
                return res.status(200).json(response);
            })
            .catch((err) => {
                return res.status(err.statusCode).json(err.error)
            })
    }
    async create(req: Request, res: Response){
        const services = new UserService();
        const {name, email, password, isAdmin} = req.body
        await services.create(name, email, password, isAdmin)
            .then(response=>{
                return res.status(200).json(response)
            })
            .catch((err) => {
                return res.status(err.statusCode).json(err.error)
            })
    }
    async delete(req: Request, res: Response){
        const services = new UserService();
        const {id} = req.params;

        await services.delete(id)
            .then(response=>{
                return res.status(204).json()
            })
            .catch((err) => {
                return res.status(err.statusCode).json(err.error)
            })
    }
    async login(req: Request, res: Response){
        const services = new UserService();
        const { email, password } = req.body;
        await services.login(email, password)
            .then(response=>{
                return res.status(200).json(response)
            })
            .catch((err) => {
                return res.status(err.statusCode).json(err.error)
            })
    }
}

export {
    UserController
}

