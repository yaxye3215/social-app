import express from 'express';
import { PORT } from './src/config/config.js';
import { connectDB } from './src/config/db.js';
import userRouter from './src/router/userRouter.js';
import postRouter from './src/router/postRouter.js';

const app = express();

app.use(express.json());
connectDB();


app.use('/api/user',userRouter)
app.use('/api/post',postRouter)




app.listen(PORT, () =>{ 
    console.log(`Server running on port ${PORT}`)
})