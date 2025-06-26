import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postSchema = new Schema({
    authorName: {type: String, required: true},
    postId: {type: Number, required:true},
    content: { type: String, required: true },
    authorEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    avatar: { type: String},
});
const postModel = mongoose.models.postModel || mongoose.model('postModel', postSchema);
export default postModel;   