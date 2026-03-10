const jwt=require("jsonwebtoken")
function verifyTocken (req,res,next){
    const tocken=req.headers.tocken
    if(tocken){
try {
    const decoded=jwt.verify(tocken,process.env.JWT_SECRET);
    req.user=decoded;
    next();
} catch (error) {
      res.status(401).json({messaage:"invalid tocken "})
}
    }
    else{
        res.status(401).json({messaage:"no token provided "})
    }
}

function verifyTokenAndAuthorization(req,res,next){
    verifyTocken(req,res,()=>{
        if(req.user.id===req.params.isadmin)
            next();
        else{
            return res.status(403).json({message:"you are not allowed "})
        }
    })
}

function verifyadmin(req,res,next){
    verifyTocken(req,res,()=>{
        if(req.params.isadmin)
            next();
        else{
            return res.status(403).json({message:"you are not allowed  only admin allowed"})
        }
    })
}
module.exports={
 verifyTocken ,
 verifyTokenAndAuthorization,
 verifyadmin

}