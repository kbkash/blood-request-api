const requestModel = require('../models/requestModel');
const generalUserDetailsModel = require('../models/generalUserDetailsModel');
const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

exports.postRequest = catchAsync(async(req,res,next)=>{
    const newRequest = await requestModel.create({
        patient_name: req.body.patient_name,
        hospital: req.body.hospital,
        blood_group: req.body.blood_group,
        time_stamp : `${req.body.date}T${req.body.time}.000+00:00`,
        amount_of_blood: req.body.amount_of_blood,
        contact_no: req.body.contact_no,
        case_of_treatment: req.body.case_of_treatment,
        custom_case: req.body.custom_case,
        relation_with_patient: req.body.relation_with_patient,
    });
    res.status(201).json({
        status: 'success',
        data: {
            requiest: newRequest
        }
    })
})

exports.getRequest = catchAsync(async(req,res,next)=>{
    const userDetails = await generalUserDetailsModel.findOne({_id: req.user.details_ref})
    const requests = await requestModel.find({blood_group: userDetails.blood_group});
    if(!requests[0]){
        return next(new AppError("No request found"), 404);
    }
    res.status(200).json({
        status: 'success',
        data:{
            requests: requests
        }
    })
})

exports.acceptRequest = catchAsync(async(req,res,next)=>{
    const acceptedRequest = await requestModel.findOneAndUpdate({id: req.body.id}, {$push: {acceptors: req.user.id}}, {
        new: true
    });
    try{
        const updatedUserDetails = await generalUserDetailsModel.findOneAndUpdate({id: req.user.details_ref}, {$set: {accepted_request: req.body.id}}, {
            new: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                accepted_request: acceptedRequest,
                updated_user_details: updatedUserDetails
            }
        })
    }
    catch(err){
        await requestModel.findOneAndUpdate({id: req.body.id}, {$pull: {acceptors: req.user.id}})
        return next(new AppError("Acceptance failed.", 400))
    }
})
