import express from "express";
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
app.use(cookieParser())
const PORT = 5000;

app.use(cors({origin:process.env.CLIENT_URL, credentials: true}));

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World.");
})


app.post("/api/signup", async (req, res) => {
   const {fullName, userName, email, password}  = req.body;

   try {
    if(!fullName || !userName || !email || !password){
        throw new Error("All fields are required.");
    }

    const emailExists = await User.findOne({email});

    if(emailExists){
        return res.status(400).json({message: "User email already exists."})
    }
    
    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      return res.status(400).json({ message: "Username already taken. try another name" });
    }
    const hashedPassword =  await bcryptjs.hash(password, 10);

    const userDoc = await User.create({
        fullName,
        userName,
        email,
        password: hashedPassword,
    })

    //jwt

    if(userDoc){
        const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,

        })

    }

    return res.status(200).json({user: userDoc , message: "User created successfully."})
   } catch (error) {
    res.status(400).json({message:error.message})
   }
})

app.listen(PORT, () => {
    connectToDB();
    console.log("server running on port", PORT)
})