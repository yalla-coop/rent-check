import mongoose from 'mongoose';

// This should be rewritten with the new full schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    max: 100,
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
  },
});
const User = mongoose.model('user', schema);

export default User;
