import jwt from 'jsonwebtoken';
import User from '../backend/models/user.models.js';

async function requireAuth(req, res, next) {
    try {

    
    //read token off cookies
const token = req.cookies.Authorization;


    //decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // expiration check
    if(Date.now() > decoded.exp)
        return res.sendStatus(401); // Unauthorized

    //find user using the decoded token 
const user = await User.findById(decoded.sub);
if(!user)
    return res.sendStatus(401); // Unauthorized}
    //attach user to request
req.user = user;
    // continue on
  next();
}
catch(error)
{
    return res.sendStatus(401); // Unauthorized
}
}
export default requireAuth;