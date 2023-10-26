import config from "../../../config.js"
import User from "../../models/userSchema.js"

let rewarding_chats = config.rewarding_chats

export default async(msg)=>{
    let keys = Object.keys(rewarding_chats)
    if(keys.includes(msg.channelId)){
        let user = await User.findOne({user_id: msg.author.id})
        console.log(msg.author.avatar)
        console.log(msg.author.avatarURL())
        console.log(msg.author.globalName)
        if(!user){
            let created = new User({
                user_id: msg.author.id,
                balance: 20,
                displayName: msg.author.displayName,
                posts:[
                    {
                        post_id: msg.id,
                        topic: rewarding_chats[msg.channel.id]
                    }
                ]
            })
            return await created.save()
        }
        
        let updatedData = {
            balance: user.balance+20,
            displayName: msg.author.displayName,
            posts: [
                ...user.posts,
                {
                    post_id: msg.id,
                    topic: rewarding_chats[msg.channel.id]
                }
            ]
        }

        let updated = await User.findOneAndUpdate({_id: user._id}, {$set: updatedData}, {new: true})

    }
}