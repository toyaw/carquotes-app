
    
const express = require('express')
const router = express.Router()
const Service = require('../models/service')
const Mechanic = require('../models/mechanic')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// All Service Route
router.get('/', async (req, res) => {
  let query = Service.find()
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('service', new RegExp(req.query.service, 'i'))
  }
  if (req.query.purchaseBefore != null && req.query.purchaseBefore != '') {
    query = query.lte('purchaseDate', req.query.purchaseBefore)
  }
  if (req.query.purchaseAfter != null && req.query.purchaseAfter != '') {
    query = query.gte('purchasehDate', req.query.purchaseAfter)
  }
  //try {
    //const services = await query.exec()
    //res.render('services/index', {
      //services: services,
      //searchOptions: req.query
    })
 // } catch {
  //  res.redirect('/')
  //}
//})

// New Service Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Service())
})

// Create Service Route
router.post('/', async (req, res) => {
  const service = new Service({
    service: req.body.title,
    mechanic: req.body.author,
    purchase: new Date(req.body.purchaseDate),
    serviceCount: req.body.serviceCount,
    description: req.body.description
  })
  saveCover(service, req.body.cover)

  try {
    const newService = await service.save()
    res.redirect(`services/${newService.id}`)
  } catch {
    renderNewPage(res, service, true)
  }
})

// Show Service Route
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
                           .populate('mechanic')
                           .exec()
    res.render('services/show', { service: service })
  } catch {
    res.redirect('/')
  }
})

// Edit Service Route
router.get('/:id/edit', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    renderEditPage(res, service)
  } catch {
    res.redirect('/')
  }
})

// Update Service Route
router.put('/:id', async (req, res) => {
  let service

  try {
    service = await Service.findById(req.params.id)
    service.service = req.body.service
    service.mechanic = req.body.mechanic
    service.purchaseDate = new Date(req.body.purchaseDate)
    service.serviceCount = req.body.serviceCount
    service.description = req.body.description
    if (req.service.cover != null && req.body.cover !== '') {
      saveCover(service, req.service.cover)
    }
    await service.save()
    res.redirect(`/services/${service.id}`)
  } catch {
    if (service != null) {
      renderEditPage(res, service, true)
    } else {
      redirect('/')
    }
  }
})

// Delete Service Page
router.delete('/:id', async (req, res) => {
  let service
  try {
    service = await Service.findById(req.params.id)
    await service.remove()
    res.redirect('/services')
  } catch {
    if (service != null) {
      res.render('services/show', {
        service: service,
        errorMessage: 'Could not remove service'
      })
    } else {
      res.redirect('/')
    }
  }
})

async function renderNewPage(res, service, hasError = false) {
  renderFormPage(res, service, 'new', hasError)
}

async function renderEditPage(res, service, hasError = false) {
  renderFormPage(res, service, 'edit', hasError)
}

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const mechanics = await Mechanic.find({})
    const params = {
      mechanics: mechanics,
      service: service
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Service'
      } else {
        params.errorMessage = 'Error Creating Service'
      }
    }
    res.render(`services/${form}`, params)
  } catch {
    res.redirect('/services')
  }
}

function saveCover(service, coverEncoded) {
  if (coverEncoded == null) return
  const cover = JSON.parse(coverEncoded)
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    service.coverImage = new Buffer.from(cover.data, 'base64')
    //service.coverImageType = cover.type
  }
}

module.exports = router
