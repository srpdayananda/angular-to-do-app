import express from 'express';
import cors from 'cors';

import DB from './config/db';
import { authRouter } from './src/auth'
import { taskRouter } from './src/task'
import { userRouter } from './src/user'
import auth from './middlewares/auth'

const app = express();
const port = 3000;

DB.connect()

app.use(express.json())
app.use(cors())

app.use('/login', authRouter)
app.use('/user', userRouter)
app.use('/task', auth, taskRouter)

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})