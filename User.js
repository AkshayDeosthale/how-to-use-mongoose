const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    uppercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
});

userSchema.methods.sayHi = function () {
  console.log(`Hi my name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

//middleware
userSchema.pre("save", function (next) {
  this.createdAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
