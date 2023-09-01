import mongoose from "mongoose";

let User = mongoose.Schema({
    user_id: String,
    balance: {
        type: Number,
        default: 0,
    },
    displayName: String,
    posts: [
        {
            post_id: String,
            topic: {
                type: String,
                enum:["Мануалы", "Крипта", "Темки", "Прогинг", "Доксинг", "Чинилы"]
            }   
        }
    ]
})

export default mongoose.model("User", User)