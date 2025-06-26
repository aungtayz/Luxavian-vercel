import express from 'express';
import { Request, Response } from 'express';    

const protectedRoute = express.Router();
protectedRoute.route('/').get(async (req: Request, res: Response): Promise<any>=> {
  console.log(req.user)
if(req.isAuthenticated()) {
  return res.status(200).json(req.user)
}else {
  return res.status(401).json({message: 'Unauthorized'})
}
   

})
    export default protectedRoute ;