const express = require('express')
const router = express.Router()
const Service = require('../models/service')




//All Service Routes
router.get('/', async (req, res) => {
   res.send('All Services') 
})

//new Service Route
router.get('/new', (req, res) => {
  res.send('New Service')
    //res.render('mechanics/new', { mechanic: new Mechanic() })
  })

  //create Service Route
  router.post('/', async (req, res) => {
    res.send('Create Service')
    })

module.exports = router