import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import filmRouter from './controllers/films.js';
import characterRouter from './controllers/characters.js';
import planetRouter from './controllers/planets.js';

const app = express();

app.use(express.json());

app.use('/api/films', filmRouter);

app.use('/api/characters', characterRouter);

app.use('/api/planets', planetRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
