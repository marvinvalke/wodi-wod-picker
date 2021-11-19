const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      text: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    personalTrainer: Boolean,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", UserSchema);

module.exports = User;
