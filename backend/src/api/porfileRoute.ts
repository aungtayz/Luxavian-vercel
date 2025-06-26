import express from "express";
import postModel from "../lib/postmodel.js";
import { Request, Response } from "express";
 
const profileRoute = express.Router();

profileRoute.route('/').get(async (req: Request, res: Response): Promise<any>=> {
const auth = req.isAuthenticated();
if(!auth) {
    return res.status(401).json({message: 'Unauthorized'});

}

return res.json({user: req.user})
})

export default profileRoute