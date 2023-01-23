import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import { routes } from './routes';
import { AppError } from './utils/errors';

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(3333, () => console.log('Server is running in port 3333!'));

export default app;
