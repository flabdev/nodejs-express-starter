const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, default: null, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);

// userSchema.pre('save', async function(next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified('password')) return next();

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete passwordConfirm field
//   this.passwordConfirm = undefined;
//   next();
// });
