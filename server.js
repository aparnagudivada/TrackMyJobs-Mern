import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app=express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import jobRouter from './client/src/routes/jobRouter.js';
import errorHandlerMiddleware from './client/src/middleware/errorHandlerMiddleware.js';
import { validateJobInput } from './client/src/middleware/validationMiddleware.js';
import authRouter from './client/src/routes/authRouter.js';
import { authenticateUser } from './client/src/middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';



import userRouter from './client/src/routes/userRouter.js';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());




app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./public','index.html'))
})
// GET all jobs
app.get('/api/v1/jobs')

// Create a job
app.post('/api/v1/jobs');

//Get a single job
app.get('/api/v1/jobs/:id')
  //Edit the job

  app.patch('/api/v1/jobs/:id')
// DELETE JOB

app.delete('/api/v1/jobs/:id')



app.use(errorHandlerMiddleware);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({msg:"something went wrong"})
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

 const port = process.env.PORT || 5100;



app.get('/',(req,res)=>{
    res.send('hello world');

})


app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'Data received', data: req.body });
});

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
