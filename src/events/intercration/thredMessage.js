import Ticket from "../../models/tickets.js"


export default async(client, msg)=>{
    let tickets = await Ticket.find()
    let threads = tickets.map(elem=>elem?.thread_id)
    let attachemnts = msg.attachemnts

    let answer = `👀│Ответ от администрации::
${msg.content}`

    if(!threads.includes(msg.channelId)){ return }
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
        let files = attachemnts ? attachemnts.map(elem=>(elem.url)) : []
        await client.users.fetch(ticket.user_id).then(async(user)=>{
            await user.send({content: answer, files})
        })
        msg.react('✅')
        return
    
}