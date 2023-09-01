import commands from "../../commands/commands.js";
import dotenv from 'dotenv'
import { ApplicationCommandOptionType, REST, Routes} from 'discord.js'

dotenv.config()


const rest = new REST({}).setToken(process.env.TOKEN)

let register = async()=>{
    try{
        let req = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {body: commands})
        console.log('added all commands')
    }
    catch(err){
        console.log(err)
    }
}

export default register;