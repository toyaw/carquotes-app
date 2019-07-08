const express = require('express')
const router = express.Router()
const Mechanic = require('../models/mechanic')
const Service = require('../models/service')


//All Mechanic Routes
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

//new Mechanic Routes
router.get('/new', (req, res) => {
    res.render('mechanics/new', { mechanic: new Mechanic() })
  })

  //create Mechanic Routes
  router.post('/', async (req, res) => {
    const mechanic = new Mechanic({
      name: req.body.name
    })
    try {
      const newMechanic = await mechanic.save()
      //res.redirect(`mechanics/${newMechanic.id}`)
      res.redirect(`mechanics`)
    } catch {
      res.render('mechanics/new', {
    mechanic: mechanic,
    errorMessage: 'Error creating new item'
  })
    }
    })
    router.get('/:id', async (req, res) => {
      try {
        const mechanic = await Mechanic.findById(req.params.id)
        const servicess = await Service.find({ mechanic: mechanic.id }).limit(6).exec()
        res.render('mechanics/show', {
          mechanic: mechanic,
          servicesByMechanic: services
        })
      } catch {
        res.redirect('/')
      }
    })
    
    router.get('/:id/edit', async (req, res) => {
      try {
        const mechanic = await Mechanic.findById(req.params.id)
        res.render('mechanics/edit', { mechanic: mechanic })
      } catch {
        res.redirect('/mechanics')
      }
    })
    
    router.put('/:id', async (req, res) => {
      let mechanic
      try {
        mechanic = await Mechanic.findById(req.params.id)
        mechanic.name = req.body.name
        await mechanic.save()
        res.redirect(`/mechanics/${mechanic.id}`)
      } catch {
        if (mechanic == null) {
          res.redirect('/')
        } else {
          res.render('mechanics/edit', {
            mechanic: mechanic,
            errorMessage: 'Error updating Mechanic'
          })
        }
      }
    })
    
    router.delete('/:id', async (req, res) => {
      let mechanic
      try {
        mechanic = await Mechanic.findById(req.params.id)
        await mechanic.remove()
        res.redirect('/authors')
      } catch {
        if (mechanic == null) {
          res.redirect('/')
        } else {
          res.redirect(`/mechanics/${mechanic.id}`)
        }
      }
    })
    
    module.exports = router
