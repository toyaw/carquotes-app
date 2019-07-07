const express = require('express')
const router = express.Router()
const Service = require('../models/service')




//All Service Routes
router.get('/', async (req, res) => {
    
})

//new Service Route
router.get('/new', (req, res) => {
    res.render('mechanics/new', { mechanic: new Mechanic() })
  })

  //create Service Route
  router.post('/', async (req, res) => {
    
    })

module.exports = router