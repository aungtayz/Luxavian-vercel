import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
 room: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },

})

const messageModel = mongoose.models.messageModel || mongoose.model('messageModel', messageSchema);
export default messageModel;