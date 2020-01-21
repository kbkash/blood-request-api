const AppError = require("./appError");

exports.restrictTo = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError("You do not have permission to perform the action", 403))
        }
        next();
    }
}