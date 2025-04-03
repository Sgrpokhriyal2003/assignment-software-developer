const mongoose = require("mongoose");

const loadSchema = new mongoose.Schema({
    shipperId: {
        type: String,
        required: true
    },

    facility: {
        loadingPoint: {
            type: String,
            required: true,
        },

        unloadingPoint:{
            type: String,
            required: true,
        },

        loadingDate: {
            type: Date,
            required: true,
        },

        unloadingDate:{
            type: Date,
            required: true,
        },
    },
    
    productType: {
        type: String,
        required: true,
    },

    truckType: {
        type: String,
        required: true,
    },

    noOfTrucks: {
        type: Number,
        required: true,
        min: 1,
    },

    weight: {
        type: Number,
        required: true,
        min: 0,
    },

    comment: {
        type: String,
    },

    datePosted: {
        type: Date,
        default: Date.now,
    },

    status: {
        type: String,
        enum: ['POSTED', 'BOOKED', 'CANCELLED'],
        default: 'POSTED',
    }
}, {timestamps: true});

module.exports = mongoose.model('Load', loadSchema);