import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import uploadRoutes from './routes/upload.routes.js'


const app = express()
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT || 5000

app.get("/",(request,response)=>{
    //server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT)
    })
})


