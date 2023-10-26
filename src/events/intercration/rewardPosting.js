import config from "../../../config.js"
import User from "../../models/userSchema.js"

let rewarding_chats = config.rewarding_chats

export default async(msg)=>{
    let keys = Object.keys(rewarding_chats)
    let roles = await msg.member.roles.guild.fetch()
    console.log(roles)
    // console.log(msg.member.roles.cache)
    // let member = await msg.member.fetch()
    // console.log(member)
    if(keys.includes(msg.channelId)){
        let user = await User.findOne({user_id: msg.author.id})
        if(!user){
            let created = new User({
                user_id: msg.author.id,
                avatar: msg.author.avatarURL(),
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
            avatar: msg.author.avatarURL(),
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