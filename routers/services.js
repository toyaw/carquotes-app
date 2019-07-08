const express = require('express')
const router = express.Router()
const Service = require('../models/service')
const Mechanic = require('../models/mechanic')
const path = require('path')
const fs = require('fs')
const imageMimeTypes = ['images/jpeg', 'image/png', 'images/gif']
const uploadPath = path.join('public', Service.serviceImageBasePath)
const multer = require('multer')
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})
//All Service Routes
router.get('/', async (req, res) => {
  let query = Service.find()
  if (req.query.service != null && req.query.service != '') {
    query = query.regex('service', new RegExp(req.query.service, 'i'))
  }
  if (req.query.purchaseBefore != null && req.query.purchaseBefore != '') {
    query = query.lte('purchaseDate', req.query.purchaseBefore)
  }
  if (req.query.purchaseAfter != null && req.query.purchaseAfter != '') {
    query = query.gte('purchaseDate', req.query.purchaseAfter)
  }
  try {
    const services = await query.exec()
    res.render('services/index', {
      services: services,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
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
  router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filname : null
    const service = new Service({
      service: req.body.service,
      purchaseDate: new Date(req.body.purchaseDate),
      servicecount: req.body.servicecount,
      mechanic: req.body.mechanic,
      serviceImageName: fileName, 
      description: req.body.description
    })

    try {
      const newService = await service.save()
      //re.redirect(`books/${newBook.id}`)
      res.redirect(`books`)
    } catch {

    }
    })
  

module.exports = router