const jwt= require('jsonwebtoken');
const asyncHandler= require('express-async-handler');
const user= require('../Models/User');

const protect = asyncHandler(async(req,res,next)=>{
let token
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
        token= req.headers.authorization.split(' ')[1];
        const decoded= jwt.verify(token,""+process.env.JWT_SECRET)
        req.user= await user.findById(decoded._id).select('-Password')
        next()
    }catch(error){
    console.log(error)
    res.status(401)
    throw new Error('not Authorized')
    }
}

if(!token){
    res.status(401)
    throw new Error('not Authorized empty token') 
}
})

const protectIns = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token= req.headers.authorization.split(' ')[1];
            const decoded= jwt.verify(token,""+process.env.JWT_SECRET)
            req.user= await user.findById(decoded._id).select('-Password')
            if(req.user.role!=2){
                res.status(401)
                throw new Error('not Authorized')
            }
            next()
        }catch(error){
        console.log(error)
        res.status(401)
        throw new Error('not Authorized')
        }
    }
    
    if(!token){
        res.status(401)
        throw new Error('not Authorized empty token') 
    }
    })

module.exports= {protect,protectIns};