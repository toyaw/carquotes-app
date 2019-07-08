const mongoose = require('mongoose')

const mechanicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }        
})
serviceSchema.pre('remove', function(next) {
    Service.find({ mechanic: this.id }, (err, services) => {
      if (err) {
        next(err)
      } else if (services.length > 0) {
        next(new Error('more mechanics'))
      } else {
        next()
      }
    })
  })
module.exports = mongoose.model('Mechanic', mechanicSchema)
