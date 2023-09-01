import { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle  } from "discord.js";
import dotenv from 'dotenv'
import register from "./events/ready/addCommands.js";
import mongoose from "mongoose";
import config from "../config.js" 
import User from "./models/userSchema.js";
import rewardPosting from "./events/intercration/rewardPosting.js";
import balance from "./events/intercration/balance.js";
import shop from "./events/intercration/shop.js";
import messageDelete from "./events/intercration/messageDelete.js";
import top from "./events/intercration/top.js";
import give from "./events/intercration/give.js";
import take from "./events/intercration/take.js";

dotenv.config()

let rewarding_chats = config.rewarding_chats
let roles = config.roles
let bot_active_chat = config.bot_active_chat

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
    ]
})

client.on("interactionCreate", async(interaction)=>{
    if(interaction.isChatInputCommand){
        if(!interaction.channelId==='bot_active_chat'){ return }
        
        if(interaction.commandName === "balance"){
            try{
                await balance(interaction, client)
                return
            }
            catch(err){
                console.log(err)
            }

        }

        if(interaction.commandName === "shop"){
            try{
                await shop(interaction, client)
                return
            }
            catch(err){
                console.log(err)
            }
            
        }

        if(interaction.commandName === "top"){
            try{
                top(client, interaction)
                return
            }
            catch(err){
                console.log(err)
            }
            
        }

        if(interaction.commandName === "give"){
            try{
                await give(interaction)
                return
            }
            catch(err){
                console.log(err)
            }
            
        }

        if(interaction.commandName === "take"){
            try{
                await take(interaction)
                return
            }
            catch(err){
                console.log(err)
            }
            
        }
        
    }
    if(interaction.isButton){        
        if(!interaction.customId){ return }
        await interaction.deferReply()
        let [type, id] = interaction.customId.split(" ")
        let keys = Object.keys(roles)
        if(type == 'shop'){
            let user = await User.findOne({user_id: interaction.user.id})
            if(!user){
                let created = new User({
                    user_id: interaction.user.id,
                    balance: 0,
                    displayName: interaction.user.displayName,
                    posts:[]
                })
                await created.save() 
            }
            let index = keys.findIndex((key)=>roles[key].id == id)
            if(index===-1){ return }
            let roles_user_have = Array.from(interaction.member.roles.cache.keys())
            let role_index = 4
            for(let i = 2; i>=0; i--){
                let found = roles_user_have.findIndex(elem=> elem == String(roles[keys[i]].id))
                role_index = found==-1 ? role_index : i
            }

            if(role_index<=index){
                let embed = new EmbedBuilder()
                .setTitle("У вас уже есть эта роль")
                .setDescription("Или роль выше")
                .setAuthor({name: interaction.user.displayName, iconURL: interaction.user.avatarURL()})
                return await interaction.editReply({embeds: [embed]})
            }
            
            let role_price = roles[keys[index]].price
            if(user.balance<role_price){
                let embed = new EmbedBuilder()
                .setTitle("Недостатоно Metacoins")
                .setDescription(`не хватает ${String(role_price-user.balance)}`)
                .setAuthor({name: 'Metamorphix', iconURL: client.user.avatarURL()})
                return await interaction.editReply({embeds: [embed]})
            }
            let new_balance = user.balance - role_price
            let updated = await User.findOneAndUpdate({_id: user._id}, {$set:{balance: new_balance}}, {new: true})
            const role = interaction.guild.roles.cache.get(id)
            await interaction.member.roles.add(role)
            for(let i=0;i<keys.length;i++){
                if(i!==index){
                    let role = interaction.guild.roles.cache.get(roles[keys[i]].id)
                    await interaction.member.roles.remove(role)
                }
                
            }
            let embed = new EmbedBuilder()
                .setTitle("Покупка прошал успешно!")
                .setDescription(`Теперь на балансе ${String(new_balance)}`)
                .setAuthor({name: 'Metamorphix', iconURL: client.user.avatarURL()})
            return await interaction.editReply({embeds: [embed]})
        }

    }
})

client.on('ready', (c)=>{
    register()
    console.log(`${c.user.tag} is ONLINE`)
})

client.on('messageCreate', async(msg)=>{
    if(msg.author.bot){ return }
    await rewardPosting(msg)
})

client.on('messageDelete', async(msg)=>{
    await messageDelete(msg)
})

let start = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URl)
        await client.login(process.env.TOKEN) 
    }
    catch(err){
        console.log(err)
    }
    
}

start()

