import userModel from '../lib/model.js';
import express from 'express';
const usersRoute = express.Router();
usersRoute.route('/').get(async (req, res) => {
    try {
        const data = await userModel.find({
            email: {
                $ne: req.user?.email
            }
        });
        res.status(200).json(data);
    }
    catch (err) {
        res.json({ "message": "error no user found" });
    }
});
usersRoute.route('/mychat').get(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { email } = user;
    try {
        const data = await userModel.findOne({
            email: email
        });
        res.status(200).json(data);
    }
    catch (err) {
        res.json({ "message": "error no user found" });
    }
});
usersRoute.route('/user').get(async (req, res) => {
    const query = req.query.userId;
    try {
        const data = await userModel.findOne({ email: query });
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(data);
    }
    catch (err) {
        res.json({ message: "error" }).status(500);
    }
});
export default usersRoute;
