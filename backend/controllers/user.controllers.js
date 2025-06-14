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

async function login (req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }
       
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.JWT_SECRET);
    
        res.cookie('Authorization', token, {
            httpOnly: true,
            secure: true, // Always use secure in production
            sameSite: 'none', // Required for cross-site cookies
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : 'localhost'
        });

        // Send a proper response
        res.status(200).json({ 
            message: 'Login successful',
            user: { 
                id: user._id,
                name: user.name,
                email: user.email 
            }
        });
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
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

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://mern-project-zl0e.onrender.com'
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// ...existing code...