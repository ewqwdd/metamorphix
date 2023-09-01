import Ticket from "../../models/tickets.js"


export default async(client, msg)=>{
    let tickets = await Ticket.find()
    let threads = tickets.map(elem=>elem?.thread_id)

    let answer = `👀│Ответ от администрации::
${msg.content}`

    if(threads.includes(msg.channelId)){
        let ticket = await Ticket.findOne({thread_id: msg.channelId})
        let updated = [
            {
                message_id: msg.id,
                content: answer,
                author: msg.author.id
            },
            ...ticket.messages
        ]
        await Ticket.findOneAndUpdate({_id: ticket._id}, {$set: {message: updated}}, {new: true})
        await client.users.fetch(ticket.user_id)
        let user = client.users.cache.get(ticket.user_id)
        await user.send(answer)
        msg.react('✅')
        return
    }
}