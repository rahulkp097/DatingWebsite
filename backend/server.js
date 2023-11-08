import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import adminRouter from './routes/adminRoute.js';
import session from 'express-session';
import crypto from "crypto"
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();


const port = process.env.PORT || 5000;
connectDB();

const app = express();


app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, PUT, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Allow cookies to be sent in cross-origin requests
  })
);



const secret = crypto.randomBytes(64).toString('hex');

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache");
   next();
  });



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoute);
app.use('/api/users/admin', adminRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.listen(port, () => console.log(`Server connected on port ${port}`));
