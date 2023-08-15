import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
/* CONFIGUARATIONs */

const __filename = fileURLToPath(import.meta.url);// to grab the fileurl
const __dirname = path.dirname(__filename)// these two statements are required only when you add module as type in package.json
dotenv.config();// to use .env files
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use("/assets",express.static(path.join(__dirname,'public/assets')))//setting dir to store our images

/* File Storage */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, res, cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage})

/* MONGOOSE */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT,() => console.log(`SERVER PORT:${PORT}`))
}).catch((error)=>{
    console.log(`error ${error}`)
})


