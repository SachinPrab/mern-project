import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
async function signup (req,res)
{
    try{
 const { name, email, password } = req.body;
const hash = bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: hash });

    res.status(201).json({ message: 'User created successfully' });

} catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

async function login (req,res)
{
    try {
    const { email, password } = req.body;
     const user = await User.findOne({ email });
    if(!user) 
        {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
       
       const passwordMatch = bcrypt.compareSync(password, user.password); //compare sent password with found user password
        if(!passwordMatch)
         {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days expiration
    const token = jwt.sign({ sub: user._id, exp }, process.env.JWT_SECRET);
    
    //set cookie
res.cookie("Authorization", token, {
    expires: new Date(exp),
    httpOnly: true, //only browser and server can access this cookie
    sameSite: "lax", //cookie will be sent only to same site
    secure: process.env.NODE_ENV === "production", //cookie will be sent only over HTTPS in production
}) 

    res.sendStatus(200);
}
catch(error)
{
    console.log('Error during login:', error);
    res.sendStatus(400); // Bad Request
}
}


async function logout (req,res) 
{
    try{res.clearCookie("Authorization");
    res.sendStatus(200);
}
catch(error)
{
    console.log('Error during logout:', error);
    res.sendStatus(400); 
}
}

async function checkAuth(req,res) {
    try{
        res.sendStatus(200);
    }
    catch(err)
    {
        return res.sendStatus(400);
    }
}

export default {
    signup,
    login,
    logout,
    checkAuth
};