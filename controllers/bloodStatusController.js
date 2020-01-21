const bloodStatusModel = require('../models/bloodStatusModel');
const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.trackNewBlood = catchAsync(async(req,res,next) => {
    const donor = await userModel.findOne({contact_no: req.body.contact_no});
    if(!donor){
        return next(new AppError("The donor doesn't exist.", 404));
    }
    const newBlood = await bloodStatusModel.create({
        status: req.body.status,
        date: req.body.date,
        blood_bank: req.user.id,
        donor: donor._id
    });
    res.status(400).json({
        status: 'success',
        data:{
            blood_status: newBlood
        }
    })
})

exports.getBloodStatus = catchAsync(async (req,res,next)=>{
    const bloodStatus = await bloodStatusModel.find({donor : req.user.id});
    if(!bloodStatus){
        return next(new AppError("Blood not found!", 404)); //404 status code for not found
    }
    res.status(200).json({
        status: 'success',
        data:{
            bloodStatus: bloodStatus
        }
    })
})

exports.updateBloodStatus = catchAsync(async (req,res,next)=>{
    const donor = await userModel.findOne({date: req.body.date,contact_no: req.body.contact_no});
    if(!donor){
        return next(new AppError("The donor doesn't exist.", 404));
    }
    const bloodStatus = await bloodStatusModel.findOneAndUpdate({donor: donor._id},{status: req.body.status},{
        new: true
    });
    if(!bloodStatus){
        return next(new AppError("Blood not found!", 404))
    }
    res.status(200).json({
        status: 'success',
        data:{
            bloodStatus: bloodStatus
        }
    })
})

exports.getAllTrackedBloods = catchAsync(async(req,res,next)=>{
    const trackedBlood = await bloodStatusModel.find({blood_bank: req.user.id});
    if(!bloodStatus[0]){
        return next(new AppError("No tracked blood found!", 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            tracked_blood: trackedBlood
        }
    })
})