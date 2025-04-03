const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    loadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Load',
        required: true
    },

    transporterId: {
        type: String,
        required: true,
    },

    proposedRate: {
        type: Number,
        required: true,
        min: 0,
    },

    comment: {
        type: String,
    },

    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING'
    },
    requestedAt: {
        type: Date,
        default: Date.now,
    }
}, {timestamps: true})

//pre-save middleware to check if load exits and is not cancelled
bookingSchema.pre('save', async function(next){
    const Load = mongoose.model('Load');
    const load = await Load.findById(this.loadId);

    if(!load){
        throw new Error('Load not found!');
    }

    if(load.status === 'CANCELLED'){
        throw new Error('Cannot create booking for cancelled load');
    }

    next();
});

module.exports = mongoose.model('Booking', bookingSchema);