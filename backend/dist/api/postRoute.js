import express from "express";
import postModel from "../lib/postmodel.js";
const postRoute = express.Router();
postRoute.use(express.json());
postRoute.route('/feeds').get(async (req, res) => {
    try {
        const feeds = await postModel.find().sort({ createdAt: -1 });
        res.status(200).json(feeds);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
postRoute.route('/').get(async (req, res) => {
    const data = await postModel.find();
    res.status(200).json(data);
}).post(async (req, res) => {
    const lastpost = await postModel.findOne().sort({ postId: -1 }).limit(1);
    const lastid = lastpost.postId++;
    const data = req.body;
    postModel.create({ ...data, postId: lastid });
    res.json({ message: "Post created successfully" }).status(201);
});
postRoute.route('/user').get(async (req, res) => {
    const query = req.query.userId;
    try {
        const data = await postModel.find({ authorEmail: query }).sort({ createdAt: -1 });
        res.json(data).status(200);
    }
    catch (err) {
        res.json({ message: "error" });
    }
});
postRoute.route('/me').get(async (req, res) => {
    const user = req.user;
    console.log(user);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const email = user.email;
    const posts = await postModel.find({ authorEmail: email }).sort({ createdAt: -1 });
    res.status(200).json(posts);
}).delete(async (req, res) => {
    res.json({ message: 'HI' });
});
export default postRoute;
