import User from "../../models/userSchema.js"
import config from "../../../config.js" 


let rewarding_chats = config.rewarding_chats

export default async(msg)=>{
    let keys = Object.keys(rewarding_chats)
    if(keys.includes(msg.channelId)){
        let user = await User.findOne({user_id: msg.author.id})
        const id = msg.id
        if(!user){ return }

        let posts = user.posts
        let index = posts.findIndex(post=>post.post_id==id)
        if(index===-1){ return }
        posts = posts.splice(index, 1)
        let updated = {
            balance: user.balance-20,
            posts
        }
        await User.findOneAndUpdate({_id: user._id}, {$set: updated}, {new: true})
}
}