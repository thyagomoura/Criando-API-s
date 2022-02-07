//config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//require('dotenv').config()

//Forma de ler JSON / middlewares
app.use(
	express.urlencoded({
		extended: true
	})
)

app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/',(req, res)=>{
	//mostrar req
	res.json({message: 'Oi express!'})

})

//mongodb+srv://thyago:<password>@cluster0.wjay6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//user thyago thyagomoura

//entregar uma porta
const DB_USER = //process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(//process.env.DB_PASSWORD)



mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.wjay6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>{
	console.log('Conectamos ao MongoDB!')
	app.listen(3000)
})
.catch((err)=> console.log(err))
