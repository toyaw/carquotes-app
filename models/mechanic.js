const mongoose = require('mongoose')
const Sevice = require('./service')

const mechanicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

mechanicSchema.pre('remove', function(next) {
  Sevice.find({ mechanic: this.id }, (err, services) => {
    if (err) {
      next(err)
    } else if (services.length > 0) {
      next(new Error('This mechanic give more services'))
    } else {
      next()
    }
  })
})

module.exports = mongoose.model('Mechanic', mechanicSchema)
