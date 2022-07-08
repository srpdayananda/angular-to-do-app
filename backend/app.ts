import express from 'express';
import cors from 'cors';

import DB from './config/db';
import { userRouter } from './src/auth'
import { taskRouter } from './src/task'
import auth from './middlewares/auth'

const app = express();
const port = 3000;

DB.connect()

app.use(express.json())
app.use(cors())

app.use('/login', userRouter)
app.use('/task', auth, taskRouter)

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})