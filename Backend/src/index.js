import dotenv from "dotenv";
import { app } from "../src/app.js";
import connectDB from "./config/db.js";

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 5050;

//database connection
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server running on http://localhost:${process.env.PORT}`)
            console.log(` Swagger running on http://localhost:${PORT}/api-docs`);
        })
        app.on("error", (err) => {
            console.log("Error: ", err);
            throw err
        })

    }).catch((err) => {
        console.log("Database connection is failed !! ", err);
    })


