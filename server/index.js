require('dotenv').config()
const express=require('express')
const sequelize=require('./db')
const PORT=process.env.PORT 

const app=express()

const start=async () => {
    try{   
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Сервер стартовал на ${PORT} порту`))
    } catch(e) {
        console.log(e)
    }
}

start