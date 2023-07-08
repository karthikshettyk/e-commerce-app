import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routes/index.js"
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}));

 app.use("/api/v1", routes);

app.get("/", (_req, res) => {
    res.send("karthik shetty - API");
})


app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

export default app;

