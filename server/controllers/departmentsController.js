const express = require('express')
const departmentsService = require("../services/departmentsService")

const router = express.Router()

router.get('/', async (req,res) => {
    const departments = await departmentsService.getAll()
    console.log("/departments - show list from the db:", departments)
    res.send(departments)
})

router.get('/:id', async (req,res) => {
    try{

        const {id} = req.params
        console.log(id)
        const department = await departmentsService.getById(id)
        console.log(`/departments/${id}:`, department)
        res.send(department)
    }
    catch(err){
        res.sendStatus(404)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        console.log(body)
        const department = await departmentsService.create(body)
        res.status(201).send(department)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await departmentsService.remove(id)
        console.log('delete result:',result._doc?.name,result._doc?._id?.toString().replace(/[^a-z0-9]*/,''))
        //console.log("delete result data",result?.data)
        res.send({method:'delete',id:result._doc?._id?.toString().replace(/[^a-z0-9]*/,''),name:result._doc?.name})
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.put('/:id', async (req,res) => {
    try {
        const objectToUpdate = req.body
        const {id} = req.params
        const result = await departmentsService.update(id,objectToUpdate)
        console.log("put result",result?.data)
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router