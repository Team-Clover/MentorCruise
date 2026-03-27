import jwt from "jsonwebtoken";


function authMiddleware(req,res,next){
    const token = req.headers.authorization;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
    }
    catch(error){
        res.status(401).json({success: false, message: "Invalid User"});
    }
}
}
export default authMiddleware;