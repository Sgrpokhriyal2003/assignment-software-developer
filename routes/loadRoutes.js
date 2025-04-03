const express = require("express")
const {body} = require("express-validator");
const loadController = require("../controllers/loadController");

const router = express.Router();

const loadValidation = [
    body('shipperId').notEmpty().withMessage('Shipper ID is required'),
    body('facility.loadingPoint').notEmpty().withMessage('Loading point is required'),
    body('facility.unloadingPoint').notEmpty().withMessage('Unloading point is required'),
    body('facility.loadingDate').isISO8601().withMessage('Invalid loading date'),
    body('facility.unloadingDate').isISO8601().withMessage('Invalid unloading date'),
    body('productType').notEmpty().withMessage('Product type is required'),
    body('truckType').notEmpty().withMessage('Truck type is required'),
    body('noOfTrucks').isInt({ min: 1 }).withMessage('Number of trucks must be at least 1'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
    body('status').optional().isIn(['POSTED', 'BOOKED', 'CANCELLED']).withMessage('Invalid status')
  ];
  
  // Routes
 router.post('/', loadValidation, loadController.createLoad);
 router.get('/', loadController.getLoads);
 router.get('/:id', loadController.getLoadById);
 router.put('/:id', loadValidation, loadController.updateLoad);
 router.delete('/:id', loadController.deleteLoad);


module.exports = router;