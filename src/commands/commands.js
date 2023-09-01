import {ApplicationCommandOptionType} from "discord.js"

export default [
    {
        name: "balance",
        description: "Показать ваш баланс",
        options:[
            {
                name: "choosen_user",
                description: "Пользователь",
                type: ApplicationCommandOptionType.User
            }
        ]
    },
    {
        name: "shop",
        description: "Открыть магазин"
    },
    {
        name: "top",
        description: "Показать таблицу лидеров"
    },
    {
        name: "give",
        description: "Зачисляет денег пользователю",
        options:[
            {
                name: "choosen_user",
                description: "Пользователь",
                type: ApplicationCommandOptionType.User,
                required: true 
            },
            {
                name: "amount",
                description: "Количество",
                type: ApplicationCommandOptionType.Number,
                required: true 
            }
        ]
    },
    {
        name: "take",
        description: "Забирает деньги у пользователя",
        options:[
            {
                name: "choosen_user",
                description: "Пользователь",
                type: ApplicationCommandOptionType.User,
                required: true 
            },
            {
                name: "amount",
                description: "Количество",
                type: ApplicationCommandOptionType.Number,
                required: true 
            }
        ]
    },
    {
        name: "ticket",
        description: "Открыть тикет",
        options:[
            {
                name: "text",
                description: "текст",
                type: ApplicationCommandOptionType.String,
                required: true 
            }
        ]
    },
    {
        name: "close",
        description: "Закрыть Тикет"
    }
]