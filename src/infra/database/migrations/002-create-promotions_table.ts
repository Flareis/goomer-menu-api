import { db } from '../index';

export async function up() {
  await db.query(`
     CREATE TABLE IF NOT EXISTS promotions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        description_promotion VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(255),
        week_days SET('mon','tue','wed','thu','fri','sat','sun'),
        start_time TIME,
        end_time TIME
      );
  `);
  console.log("Table created successfully!");
}

export async function down() {
  await db.query('DROP TABLE IF EXISTS promotions;');
  console.log('Table dropped successfully!');
}
