import Ticket from "../../models/tickets.js"
import config from "../../../config.js"
import dotenv from "dotenv"

dotenv.config()

let ticket_log = config.ticket_log

export default async(client, interaction)=>{
    await interaction.deferReply({ephemeral: true})
    let content = interaction.options.get("text").value
    let id = interaction.user.id
    let existed = await Ticket.findOneAndDelete({user_id: id})
    if(existed){
        await client.channels.fetch(existed.thread_id)
        let existedChannel = client.channels.cache.get(existed.thread_id)
        await existedChannel.delete()
    }
    
   
    let title = `От пользователя ${interaction.user}

    `
    const role = interaction.guild.roles.cache.get(process.env.ADMIN_ROLE)
    let admin = `

    ${role}`
    let messageText = title + content + admin
    await client.channels.fetch(ticket_log)
    let channel = client.channels.cache.get(ticket_log)
    let threadId;

    await channel.send(messageText).then(async(message) => {
        await message.startThread({
            name: `${interaction.user.id}`,
            type: 'GUILD_PUBLIC_THREAD'
        }).then((thread) => {
            threadId = thread.id; 
        });
    });


    let ticket = Ticket({
        user_id: id,
        thread_id: threadId,
        messages: [
            {
                content,
                author: id,
            }
        ]
    })
    await ticket.save()

    await interaction.editReply({content: "Успешно", ephemeral: true})
    return
}


