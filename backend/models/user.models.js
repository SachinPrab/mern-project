import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
name:
{
    type: String,
    required: true,
},

email: {
    type: String,
    required: true,
    unique: true,
lowercase: true,
index: true,
},

password: {
    type: String,
    required: true,
}
});

const User = mongoose.model('User', userSchema);
export default User;
// Export the User model to be used in other parts of the application