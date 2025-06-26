import express from "express";
import userModel from "../lib/model.js";
const userRouter = express.Router();
userRouter.route('/').get(async (req, res) => {
    try {
        const user = await userModel.findOne();
    }
    catch (error) {
        console.error('Error in userRouter:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
