import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import apiRouter from './routes/apiRouter.js';
import authRouter from './routes/authRouter.js';

import syncTables from './db/syncTables.js';

const app = express();

// cors
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// static files
app.use(express.static(path.join(process.cwd(), 'uploads')));

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie parser
app.use(cookieParser());

// logs
app.use(morgan('tiny'));

// auth/user middlewares
app.use(passport.initialize());

// routes
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// sync database tables
await syncTables();

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/`);
});
