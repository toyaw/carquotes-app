const express = require('express')
const router = express.Router()
const Author = require('../models/author')
//All service
router.get('/', async (req, res) => {
  let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions)
    res.render('authors/index', { 
      authors: authors,
       searchOptions: req.query})
  } catch {
    res.redirect('/')
  }
  
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