const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res)=>{
	
	//req.body

	//{name: "Thyago", salary: 5000, approved: false}
	const {name, salary, approved} = req.body
	if(!name){
		res.status(422).json({error: 'O nome é obrigatório'})
	}

	const person = {
		name,
		salary,
		approved
	}

	//create
	try{
		//criando dados
		await Person.creat(person)

		res.status(201).json({message:'Pessoa inserida no sistema com sucesso'})
		return
	}catch(error){
		res.status(500).json({error: error})
	}
})

//read 

router.get('/', async (req, res)=>{
	try{
		const people = await Person.find()

		res.status(200).json(people)
		return
	}catch(error){
		res.status(500).json({error: error})
	}
})

router.get('/:id', async (req, res) => {
	const id = req.params.id

	try{
		const person = await Person.findOne({_id: id})

		if(!person){
			res.status(422).json({message: 'O usario nao foi encontrado'})
			return
		}

		res.status(200).json(person)
	}catch(error){
		res.status(500).json({error: error})
	}
})

//update
router.patch('/:id', async(req, res)=>{
	const id = req.params.id
	const {name, salary, approved} = req.body

	const person = {
		name, 
		salary,
		approved
	}

	try{
		const updatedPerson = await Person.updateOne({_id: id}, person)

		if(updatedPerson.matchedCount === 0){
			res.status(422).json({message: 'O usario nao foi encontrado'})
			return
		}
		res.status(200).json(person)
	}catch(error){
		res.status(500).json({error: error})
	}
})

router.delete('/:id', async (req, res)=>{
	const id = req.params.id
		const person = await Person.findOne({_id: id})

		if(!person){
			res.status(422).json({message: 'O usario nao foi encontrado'})
			return
		}

		try{
			await Person.deleteOne({_i : id})
			res.status(200).json({message: 'usuario deletado com sucesso'})
			return
		}
		res.status(200).json(person)
	}catch(error){
		res.status(500).json({error: error})
	}
})








module.exports = router 


