import User from "../../models/userSchema.js"
import { EmbedBuilder } from "discord.js";

export default async(interaction, client)=>{
    let requestUser = interaction.user
    if(interaction.options.get("choosen_user")){
        let id = interaction.options.get("choosen_user").value
        requestUser = client.users.cache.get(id)
    }
    let user = await User.findOne({user_id: requestUser.id})
    let toDisplay = user
    if(!user){
        let created = new User({
            user_id: requestUser.id,
            balance: 0,
            displayName: requestUser.displayName,
            posts:[]
        })
        await created.save() 
            toDisplay = created
    }

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Баланс пользователя ${toDisplay.displayName}`)
        .addFields({
            name: "баланс:",
            value: `${toDisplay.balance} Metacoins`
        })
        .setThumbnail(requestUser.avatarURL())
        .setAuthor({name: 'Metamorphix', iconURL: client.user.avatarURL()})

    interaction.reply({embeds:[embed]})
}