import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.APP_SECRET || "secret"
interface iDecoded{
    id: string;
    isAdmin: string;
}

export default {
    validate(req: Request, res: Response, next: NextFunction){
        let token : any = req.headers.token;
        token = token.split(" ")[1]

        if(!token)return res.status(401).json({message:"You must provide a token"});

        jwt.verify(token, secret, function(err: any, decoded: any) {
            if (err) return res.status(500).json({ auth: err.name, message: err.message });
            req.headers.id = decoded.id;
            req.headers.isAdmin = decoded.isAdmin;
            next();
          });
    }
}
