const eventModel = require('../models/eventModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const generalUserDetailsModel = require('../models/generalUserDetailsModel');

exports.addEvent = catchAsync(async(req, res, next)=>{
    newEvent = await eventModel.create({
        location : req.body.location,
        time_stamp : `${req.body.date}T${req.body.time}.000+00:00`,
        remarks: req.body.remarks,
        organizer: req.user.id
    });
    res.status(201).json({
        status: 'success',
        data: {
            event: newEvent
        }
    })
})

exports.getAllEvents = catchAsync(async (req,res,next)=>{
    const events = await eventModel.find();
    if(!events[0]){
        return next(new AppError("No events found", 404))
    }
    res.status(200).json({
        status: 'success',
        data:{
            events: events
        }
    })
})

exports.getMyEvents = catchAsync(async(req,res,next)=>{
    const events = await eventModel.find({organizer: req.user.id});
    if(!events[0]){
        return next(new AppError("No events found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            events: events
        }
    })
})

exports.cancelEvent = catchAsync(async(req,res,next)=>{
    await eventModel.deleteOne({_id: req.body.id}, (err, result)=>{
        if(err){
            return next(new AppError("Action cannot be perfored.", 400))
        }
        res.status(200).json({
            status: "success",
            data: {
                result: result
            }
        })
    });
})

exports.getInterestedDonors = catchAsync(async(req,res,next)=>{
    const event = await eventModel.findById(req.params.id);
    if(!event){
        return next(new AppError("Event doesn't exist", 404))
    }
    res.status(200).json({
        status: "success",
        data:{
            interested_donors: event.interested_donors
        }
    })
})

//changes the intrested event for user and removes any if there in no event id in the req body
exports.rejectEvent = catchAsync(async(req, res, next)=>{
    const updatedUserDetails = await generalUserDetailsModel.findByIdAndUpdate(req.user.details_ref, {$unset:{accepted_event: null}}, {
        new: true
    })
    try{
        const updatedEvent = await eventModel.findByIdAndUpdate(req.body.id, {$pull:{intrested_donors: req.user.id}}, {
            new: true
        })
        res.status(200).json({
            status: "success",
            data: {
                user_details: updatedUserDetails,
                event: updatedEvent
            }
        })
    }
    //reverting back if due to any reason updating event failed
    catch(err){
        await generalUserDetailsModel.findByIdAndUpdate(req.user.details_ref, {$set:{accepted_event: req.body.id}})
        return next(new AppError("Rejection failed.", 400))
    }

})

exports.acceptEvent=catchAsync(async(req,res,next)=>{
    const updatedUser = await generalUserDetailsModel.findByIdAndUpdate({_id:req.user.details_ref}, {$set:{accepted_event: req.body.id}}, {
        new: true,
        runValidators: true
    })
    try{
        const updatedEvent = await eventModel.findOneAndUpdate({_id: req.body.id}, {$push:{intrested_donors: req.user.id}},{
            new: true,
            runValidators: true
        })
        res.status(201).json({
            status: "success",
            data: {
                user_details: updatedUser,
                event: updatedEvent
            }
        })
    }
    //reverting back if due to any reason updating event failed
    catch(err){
        await generalUserDetailsModel.findOneAndUpdate({_id:req.user.details_ref}, {$unset:{accepted_event: null}})
        return next(new AppError("Acceptance failed.", 400))
    }
})

exports.getAcceptedEvent = catchAsync(async(req,res,next)=>{
    const user = await generalUserDetailsModel.findById(req.user.details_ref);
    const acceptedEvent = await eventModel.findById(user.accepted_event).select("-intrested_donors")
    res.status(200).json({
        status: "success",
        data:{
            accepted_event: acceptedEvent
        }
    })
})