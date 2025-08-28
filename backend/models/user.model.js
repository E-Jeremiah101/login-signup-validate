import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    userName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String,  required: true}
})

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;