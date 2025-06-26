import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
    avatar: { type: String },
});
const userModel = mongoose.models.userModel || mongoose.model('userModel', userSchema);
export default userModel;
