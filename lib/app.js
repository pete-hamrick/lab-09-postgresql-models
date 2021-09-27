import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import filmRouter from './controllers/films.js';

const app = express();

app.use(express.json());

app.use('/api/films', filmRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
