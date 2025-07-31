import express from "express"
import cors from "cors"
import path from "path"
import authRoutes from "./src/routes/auth.routes.js"
import massageRoutes from "./src/routes/message.routes.js"
import userRouter from "./src/routes/user.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./src/Database/db.js"
import cookieParser from "cookie-parser"
import { app, server } from "./src/Database/socket.js"




dotenv.config()

const Port = process.env.Port
const __dirname = path.resolve();

// const app = express()
app.use(cors({
    origin: "https://purlse-chat-front.vercel.app/",
    credentials: true
}))



app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {

    res.status(200).json({
        message: "Hello Subscribers!!!!👋👋👋👋 of PulseChat🌟🌟"
    })

})

app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes)
app.use("/api/messages", massageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error Baby';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

server.listen(Port, () => {
    console.log("server is running on PORT:  👋👋👋👋👋👋💓" + Port)
    connectDB()
})
