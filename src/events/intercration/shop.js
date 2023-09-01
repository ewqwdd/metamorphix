import config from "../../../config.js"
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle  } from "discord.js";

let roles = config.roles

export default async(interaction, client)=>{
    await interaction.deferReply()
    const row = new ActionRowBuilder()
    let keys = Object.keys(roles)
    keys.forEach((elem)=>{
        row.components.push(
            new ButtonBuilder().setCustomId(`shop ${roles[elem].id}`).setLabel(elem).setStyle(ButtonStyle.Success)
        )
    })
    let embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle("Магазин")
        .setDescription("Здесь вы можете приобрести роли за валюту сервера. Валюта сервера зарабатываеться за публикацтю в тематических каналах")
        .addFields(keys.map(elem=>({name: elem, value: `${roles[elem].price} Metacoins`, inline: true})))
        .setThumbnail('https://www.iconarchive.com/download/i103468/paomedia/small-n-flat/shop.1024.png')
        .setAuthor({name: 'Metamorphix', iconURL: client.user.avatarURL()})
    await interaction.editReply({
        components: [row],
        embeds: [embed]
    })
}