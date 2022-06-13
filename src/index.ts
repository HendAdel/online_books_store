import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import  authorRoutes from "./handlers/author";
import  categoryRoutes from "./handlers/category";
import  publisherRoutes from "./handlers/publisher";
import  userRoutes from "./handlers/user";
import  bookRoutes from "./handlers/book";
import  orderRoutes from "./handlers/order";

dotenv.config();

const PORT = process.env.PORT || 3000;
// create an instance server
const app: Application = express();
// HTTP request logger middleware
app.use(morgan('short'));

// add routing for / path
// app.get('/', (req: Request, res: Response) => {
//   res.json({
//     message: 'Hello World 🌍'
//   });
// });

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
