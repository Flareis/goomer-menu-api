import { db } from '../index';

export async function up() {
  await db.query(`
     CREATE TABLE IF NOT EXISTS promotions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        description_promotion VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        week_days SET('mon','tue','wed','thu','fri','sat','sun'),
        start_time TIME,
        end_time TIME,
        CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      );
  `);
  console.log('Table created successfully!');
}

export async function down() {
  await db.query('DROP TABLE IF EXISTS promotions;');
  console.log('Table dropped successfully!');
}
