import express from "express";
import dotenv from "dotenv";
import productsRoutes from "./product-routes";

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    endpoints: [
      'POST /api/products',
    ]
  });
});

app.use('/api', productsRoutes);

export default app;
