import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default {
    validate(req: Request, res: Response, next: NextFunction){
        let token : any = req.headers.token;
        token = token.split(" ")[1]
        
        if(!token)return res.status(401).json({message:"You must provide a token"});

        jwt.verify(token, process.env.APP_SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: err.name, message: err.message });
            req.headers.id = decoded.id;
            req.headers.isAdmin = decoded.isAdmin;
            next();
          });
    }
}
