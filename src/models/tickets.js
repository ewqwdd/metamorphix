import mongoose from "mongoose";

let Ticket = mongoose.Schema({
  user_id: {
    type: String,
    ref: 'User',
  },
  thread_id: {
    type: String
  },
  messages:[
    {
        message_id: {
            type: String
        },
        content:{
            type: String
        },
        author:{
            type: String
        }
    }
  ]
})

export default mongoose.model("Ticket", Ticket)