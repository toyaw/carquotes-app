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
  router.post('/', (req, res) => {
    const author = Author({
      name: req.body.name
    })
    author.save((err, newAuthor) => { 
    if (err) {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating new item'
      })
    } else {
      //res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`)
    }
  })
    res.send(req.body.name)
  })
//

module.exports = router