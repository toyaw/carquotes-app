const express = require('express')
const router = express.Router()

//All service
router.get('/', (req, res) => {
  res.render('authors/index')
})

//new service
router.get('/new', (req, res) => {
    res.render('authors/new')
  })

  //create service
  router.post('/', (req, res) => {
    res.send('create')
  })
//

module.exports = router