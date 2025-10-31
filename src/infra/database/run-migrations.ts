import { up as upProducts } from './migrations/001-create-products_table';
import { up as upPromotions } from './migrations/002-create-promotions_table';

async function runMigrations() {
  try {
    await upProducts();
    await upPromotions();
    console.log('Migration executed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error executing migration:', err);
    process.exit(1);
  }
}

runMigrations();
