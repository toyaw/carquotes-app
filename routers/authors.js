const express = require('express')
const router = express.Router()
const Author = require('../models/author')
//All service
router.get('/', (req, res) => {
  res.render('authors/index')
})

//new service
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
  })

  //create service
  router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      //res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`)
    } catch {
      res.render('authors/new', {
    author: author,
    errorMessage: 'Error creating new item'
  })
    }
    })

module.exports = router