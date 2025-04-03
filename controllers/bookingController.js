const Booking = require("../models/booking");
const Load = require("../models/load");
const { validationResult } = require("express-validator"); 

//create a new booking
exports.createBooking = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }

        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

//get all booking with filters
exports.getBookings = async (req, res) => {
    try{
        const {shipperId, transporterId, status} = req.query;
        const query = {};
        
        if(transporterId) {
            query.transporterId = transporterId;
        }
        if(status){
            query.status = status;
        }

        let bookings = await Booking.find(query).populate('loadId');

        if(shipperId){
            bookings = bookings.filter(booking => booking.loadId.shipperId === shipperId);
        }

        res.status(200).json({
            success: true,
            bookings
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

//get booking by id
exports.getBookingById = async(req, res) => {
    try{
        const booking = await Booking.findById(req.params.id).populate('loadId')
        if(!booking){
            return res.status(400).json({
                success: false,
                message: "Booking not found!"
            })
        }

        res.status(200).json({
            success: true,
            booking
        })

    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//update booking status
exports.updateBookingStatus = async(req, res) => {
    try{
        const {status} = req.body;
        const booking = await Booking.findById(req.params.id);

        if(!booking){
            return res.status(404).json({
                message: 'Booking not found!'
            })
        }

        if(status === 'ACCEPTED'){
            const load = await Load.findById(booking.loadId);
            load.status = 'BOOKED';
            await load.save();
        }

        booking.status = status;
        await booking.save()
        res.json(booking);
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//delete booking

exports.deleteBooking = async(req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({message: "Booking not found!"});
        }

        const load = await Load.findById(booking.loadId);
        load.status = 'CANCELLED';
        await load.save();

        await booking.remove();
        res.json({message: 'Booking deleted successfully!'});

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};