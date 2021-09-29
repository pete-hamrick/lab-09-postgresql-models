import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import filmRouter from './controllers/films.js';
import characterRouter from './controllers/characters.js';
import planetRouter from './controllers/planets.js';
import starshipRouter from './controllers/starships.js';
import vehicleRouter from './controllers/vehicles.js';

const app = express();

app.use(express.json());

app.use('/api/films', filmRouter);

app.use('/api/characters', characterRouter);

app.use('/api/planets', planetRouter);

app.use('/api/starships', starshipRouter);

app.use('/api/vehicles', vehicleRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
