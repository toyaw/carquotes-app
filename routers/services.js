const express = require('express')
const router = express.Router()
const Service = require('../models/service')
const Mechanic = require('../models/mechanic')



//All Service Routes
router.get('/', async (req, res) => {
   res.send('All Services') 
})

//new Service Route
router.get('/new', async (req, res) => {
  try {
    const mechanics = await Mechanics.find({})
    const service = new Service()
    res.render('services/new', {
      mechanics: mechanics,
      service: service
    })
  } catch {
res.redirect('/services')
  }
  })

  //create Service Route
  router.post('/', async (req, res) => {
    res.send('Create Service')
    })

module.exports = router