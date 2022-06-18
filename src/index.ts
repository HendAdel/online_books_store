import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import * as dotenv from 'dotenv';
import  authorRoutes from "./handlers/author";
import  categoryRoutes from "./handlers/category";
import  publisherRoutes from "./handlers/publisher";
import  userRoutes from "./handlers/user";
import  bookRoutes from "./handlers/book";
import  orderRoutes from "./handlers/order";
import db from "./database";

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "To many requests from this API, Please try again later!",
}))
app.use(express.json());

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  console.log(`user routes in index page`); 
  res.json({
    message: 'Hello World 🌍'
  });
});



// app.use('/api', userRoutes)
// app.get('/users', (_req: Request, res: Response) => {
//   try {
//     console.log(`user routes in index page`)
//       res.send('this is the Users INDEX route')
//   } catch (err) {
//       res.status(400)
//       res.json(err)
//   }
// })
categoryRoutes(app);
publisherRoutes(app);
userRoutes(app);
bookRoutes(app);
orderRoutes(app);
authorRoutes(app);


// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`);
});

export default app;
