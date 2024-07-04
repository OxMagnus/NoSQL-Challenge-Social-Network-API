const express = require('express')//brings in express
const app = express()
const db = require('./config/connection')//adds the connection to the database
const routes = require('./routes')
const PORT =process.env.PORT|| 3001
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(routes)

db.once('open',()=>{//the database is used and connected
    app.listen(PORT, ()=>{
        console.log('App is listening');
    })
})