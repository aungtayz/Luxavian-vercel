import express from 'express';
const protectedRoute = express.Router();
protectedRoute.route('/').get(async (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        return res.status(200).json(req.user);
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});
export default protectedRoute;
