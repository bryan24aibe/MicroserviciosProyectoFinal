import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import cookieParse from "cookie-parser";


const app = express()
app.use(express.json())
app.use(cookieParse())
app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/posts", postRoutes)
app.listen(8080, ()=>{
    console.log("Connected!")
})