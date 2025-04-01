import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import swaggerDocs from "./config/SwaggerConfig.js";



// Manually calculate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Middleware
app.use(cors({
    origin: [
        "http://localhost:5173", // Development
        "https://your-vercel-app-url.vercel.app" // Production
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Use path.join to join directories
app.use(cookieParser());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//import routes
import todoRouter from "./routes/todo.routes.js";
import userRouter from "./routes/user.route.js";

//routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);


export { app };
