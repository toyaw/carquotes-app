const express = require('express')
const router = express.Router()
const mechanic = require('../models/mechanic')


//All Mechanic
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const mechanics = await Mechanic.find(searchOptions)
    res.render('mechanics/index', { 
      mechanics: mechanics,
       searchOptions: req.query})
  } catch {
    res.redirect('/')
  }
  
})

//new Mechanic
router.get('/new', (req, res) => {
    res.render('mechanics/new', { mechanic: new Mechanic() })
  })

  //create Mechanic
  router.post('/', async (req, res) => {
    const mechanic = new Mechanic({
      name: req.body.name
    })
    try {
      const newMechanic = await mechanic.save()
      //res.redirect(`mechanics/${newMechanic.id}`)
      res.redirect(`mechanic`)
    } catch {
      res.render('mechanics/new', {
    mechanic: mechanic,
    errorMessage: 'Error creating new item'
  })
    }
    })

module.exports = router