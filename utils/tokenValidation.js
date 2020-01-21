const jwt = require('jsonwebtoken');
const AppError = require('./appError');
const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync')

module.exports = {
    validateToken: (req, res, next) => {
      if (req.headers.token) {
        jwt.verify(req.headers.token, process.env.JWT_SECRET, catchAsync(async(err,decoded)=>{
            if(err){
                return next(new AppError("Authentication error."), 401);
            }
            const user = await userModel.findById(decoded.id);
            if(!user){
              return next(new AppError("User doesn't exist."), 404);
            }
            req.user = user;
            next();
        })
      )} else {
        return next(new AppError("Authentication error. Token required. "), 401);
      }
    }
  };