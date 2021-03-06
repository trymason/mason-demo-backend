var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    photoUrl: { type: String, default: 'https://github.com/identicons/tim5046.png' }
  }, { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 8);
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.getPublicObject = function() {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    photoUrl: this.photoUrl,
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;