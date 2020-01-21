var userModel = require("../models/userModel");
var generalUserDetailsModel = require('../models/generalUserDetailsModel');
var bloodBankStatusModel = require('../models/bloodBankDetailsModel');
var jwt = require('jsonwebtoken');
var catchAsync = require('../utils/catchAsync');
var AppError = require('../utils/appError');
var bcrypt = require('bcryptjs');

const signToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET) //{ id } same as { id= id }
}

exports.registerUser = catchAsync(async (req, res, next) => {
    var newUserDetails = undefined;
    if(req.body.user.role === "general"){
        newUserDetails = await generalUserDetailsModel.create(req.body.details);
    }else if(req.body.user.role==="blood-bank"){
        newUserDetails = await bloodBankStatusModel.create(req.body.details)
    }else{
        return next(new AppError("The user role doesn't exist.", 400));
    }
    req.body.user.details_ref = newUserDetails._id
    try{
        const newUser = await  userModel.create(req.body.user);
        const token = signToken(newUser._id);
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser,
                details: newUserDetails
            }
        })
    }catch(ex){
        await generalUserDetailsModel.findByIdAndDelete(newUserDetails._id);
        return next(new AppError(ex, 400));
    }
})

exports.updateUser = catchAsync(async(req,res,next)=>{
    const updatedUser = await userModel.findByIdAndUpdate(req.user.id, req.body.user, {
        new: true,
        runValidators: true
    })
    var updatedDetails = undefined;
    if(updatedUser.role == "general"){
        updatedDetails = await generalUserDetailsModel.findByIdAndUpdate(req.user.details_ref, req.body.details, {
            new: true,
            runValidators: true
        })
    }else if(updatedUser.role == "blood-bank"){
        updatedDetails = await bloodBankStatusModel.findByIdAndUpdate(req.user.details_ref, req.body.details,{
            new: true,
            runValidators: true
        })
    }
    res.status(201).json({
        status: 'success',
        data: {
            user: updatedUser,
            details: updatedDetails
        }
    })
})

exports.loginUser = catchAsync(async(req,res,next)=>{
    const { email, password } = req.body;   //js object destructuring
    if(!email || !password){
        return next(new AppError("Please provide email and password!", 400))
    }

    const user = await userModel.findOne({email}).select("+password");

    if(!user || !(await bcrypt.compare(password, user.password))){
        return next(new AppError("Incorrect email or password"), 401) //401 is the status code for "unauthorized"
    }

    const token= signToken(user._id);
    res.status(200).json({
        status: "success",
        token,
        role: user.role
    })
})

exports.getBloodBanks = catchAsync(async(req,res,next)=>{
    const bloodBanks = await userModel.find({"role":"blood-bank"});
    if(!bloodBanks[0]){
        return next(new AppError("No blood banks found", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
            bloodBanks: bloodBanks
        }
    })
})