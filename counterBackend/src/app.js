import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { connect } from './config/db';
import logger from 'morgan';
import indexRouter from './routes/index';
import cors from 'cors';

const app = express();

// Cross platform origin resource sharing
app.use(cors());

// Database connection  
connect();

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', indexRouter);

export default app;