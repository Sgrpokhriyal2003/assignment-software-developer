const Load = require("../models/load");
const {validationResult} = require('express-validator');

//create a new load
exports.createLoad = async(req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const load = new Load(req.body);
        await load.save();
        res.status(201).json(load);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

//get all load with filter
exports.getLoads = async(req, res) => {
    try{
        const {shipperId, truckType, status} = req.body;
        const query = {};

        if(shipperId) query.shipperId = shipperId;
        if(truckType) query.truckType = truckType;
        if(status) query.status = status;

        const loads = await Load.find(query);
        res.json(loads);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

//get load by id
exports.getLoadById = async(req, res) => {
    try{
        const load = await Load.findById(req.params.id);
        if(!load){
            return res.status(404).json({
                success: "false",
                message: 'load not found!' 
            })
        }
        res.json(load);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

//update load
exports.updateLoad = async(req, res) => {
    try{
        const load = await Load.findById(req.params.id);
        if(!load) {
            return res.status(404).json({message: 'Load is not found'})
        }

        Object.assign(load, req.body)
        await load.save();
        res.json(load)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}


//delete load
exports.deleteLoad = async(req, res) => {
    try{

        const load = await Load.findById(req.params.id)
        if(!load){
            return res.status(404).json({message: 'Load not found!'})
        }

        await load.remove();
        res.json({message: 'Load deleted successfully'})
    }
    catch(error){
        res.status(500).json({message: error.message});
    }

}