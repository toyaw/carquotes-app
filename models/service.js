const mongoose = require('mongoose')

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
    }           

})

module.exports = mongoose.model('Service', serviceSchema)
