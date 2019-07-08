const mongoose = require('mongoose')
//const path = require('path')
//const serviceImageBasePath = 'uploads/serviceCovers'
const serviceSchema = new mongoose.Schema({

    service: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    serviceCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    serviceImageName: {
        type: String,
        required: true
    },
    mechanic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mechanic'
    },
        serviceImageName: {
          type: String,
          required: true
        }
        
      })
      
      serviceSchema.virtual('serviceImagePath').get(function() {
        if (this.serviceImageName != null) {
         
    return `data:${this.serviceImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
}
})

module.exports = mongoose.model('Service', serviceSchema)
