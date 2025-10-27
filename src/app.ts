import express from "express";
import dotenv from "dotenv";
import productsRoutes from "./routes/product-routes";
import promotionsRoutes from "./routes/promotion-routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/api/promotions', promotionsRoutes);

export default app;
