import express from "express";
const profileRoute = express.Router();
profileRoute.route('/').get(async (req, res) => {
    const auth = req.isAuthenticated();
    if (!auth) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ user: req.user });
});
export default profileRoute;
