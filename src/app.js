import express from 'express';
import morgan from 'morgan';
//Routes
import usersRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import tasksRoutes from './routes/task.routes.js';
import { authenticateToken } from './middlewares/autenticate.midleware.js';

const app = express();

//Middlewares
app.use(morgan('dev')); 
app.use(express.json()); // GET, POST, PUT, DELETE

//Routes

app.use('/api/login', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', authenticateToken, tasksRoutes);

export default app;