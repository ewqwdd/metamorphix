import { EmbedBuilder  } from "discord.js";
import User from "./../../models/userSchema.js";


export default async(client, interaction)=>{
    await interaction.deferReply()
    let users = await User.find()
    let sorted = users.sort((a, b)=>b.balance-a.balance).slice(0, 10)

    let func = async(id)=>{
        await client.users.fetch(id)
    }

    for(let i=0; i<sorted.length; i++){
        await func(sorted[i].user_id)
    }

    let ranks = sorted.map((elem, index)=>`${index+1}.${client.users.cache.get(elem.user_id) || "@" + elem.displayName} ${elem.balance}`)
    let embed = new EmbedBuilder()
        .setColor(0x840000)
        .setTitle("Рейтинг")
        .setFields({name:'Top', value:ranks.join(`
        `)})
        .setThumbnail('https://cdn-icons-png.flaticon.com/512/3150/3150115.png')
        .setAuthor({name: 'Metamorphix', iconURL: client.user.avatarURL()})
    await interaction.editReply({embeds:[embed]})
}