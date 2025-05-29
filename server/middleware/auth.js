import jwt from "jsonwebtoken";

const auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({success:false,errMsg:"unauthorized"})
    }
  }

  export default auth