const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const UserSchema = new Schema(
  {
    googleID: String,
    name: {
      type: String,
    },
    email: {
      type: String,
      text: true,
    },
    password: {
      type: String,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

module.exports = UserModel;
