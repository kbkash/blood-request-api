//function for catching erros due to asynchronous operations or functions
module.exports = (func) => {
    return (req,res,next)=>{
        func(req,res,next).catch(next);
    }
}
