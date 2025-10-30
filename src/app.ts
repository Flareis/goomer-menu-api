import express from "express";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import productsRoutes from "./routes/product-routes";
import promotionsRoutes from "./routes/promotion-routes";
import menuRoutes from "./routes/menu-routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/products', productsRoutes);
app.use('/api/promotions', promotionsRoutes);
app.use('/api/menu', menuRoutes)

export default app;
