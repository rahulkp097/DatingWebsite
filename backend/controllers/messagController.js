import expressAsyncHandler from "express-async-handler"

import userModel from "../models/userModels.js"
import ChatModel from "../models/chatModel.js"
import messageModel from "../models/messageModels.js"

const sendMessage = expressAsyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await messageModel.create(newMessage);
  
      message = await message.populate("sender", "name image email");
      message = await message.populate("chat");
      message = await userModel.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  
      await ChatModel.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
  
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });
  
 
const allMessages=expressAsyncHandler(async(req,res)=>{
    try {
        const messages = await messageModel.find({ chat: req.params.chatId })
          .populate("sender", "name image email")
          .populate("chat");
        res.status(200).json({messages});
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
})



export { sendMessage,allMessages };
