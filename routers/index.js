const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  let services
  try {
    services = await Service.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    services = []
  }
  res.render('index', { services: services })
})


module.exports = router