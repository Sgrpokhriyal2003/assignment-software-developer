const express = require("express");
const { body } = require("express-validator");
const bookingController  = require("../controllers/bookingController");

const router = express.Router();


//validation 
const bookingValidation = [
    body('loadId').notEmpty().withMessage('Load ID is required!'),
    body('transporterId').notEmpty().withMessage('Transporter ID is required'),
    body('proposedRate').isFloat({min: 0}).withMessage('Proposed rate must be a positive number'),
    body('status').optional().isIn(['PENDING', 'ACCEPTED', 'REJECTED']).withMessage('Invalid status')
];

router.post('/', bookingValidation, bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBookingById);
router.put('/:id/status', body('status').isIn(['ACCEPTED', 'REJECTED']).withMessage('invalid status'), bookingController.updateBookingStatus);
router.delete('/:id', bookingController.deleteBooking);


module.exports = router;