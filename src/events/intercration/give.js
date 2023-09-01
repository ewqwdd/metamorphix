import User from "../../models/userSchema.js"
import dotenv from "dotenv"

dotenv.config()

export default async(interaction)=>{
    await interaction.deferReply({ephemeral: true})
    let id = interaction.options.get("choosen_user").value
    let amount = interaction.options.get("amount").value
            
    let userRoles = Array.from(interaction.member.roles.cache.keys())
    if(!userRoles.includes(process.env.ADMIN_ROLE) || !interaction.user.id == process.env.DEV){ return }
    let user = await User.findOne({user_id: id})
    if(!user){
        let created = new User({
             user_id: requestUser.id,
            balance: Number(amount),
            displayName: requestUser.displayName,
            posts:[]
        })
        await created.save() 
        return
    }
    let updated = {
        balance: Number(user.balance + amount)
    }

    await User.findOneAndUpdate({_id: user._id}, {$set: updated}, {new: true})
    await interaction.editReply({content: `Баланс обновлен: ${updated.balance}`})
    return
}