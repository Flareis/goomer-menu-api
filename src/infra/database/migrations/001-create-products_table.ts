import { db } from '../index';

export async function up() {
  await db.query(`
     CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        category VARCHAR(255),
        visibility BOOLEAN DEFAULT true
      );
  `);
  console.log("Table created successfully!");
}

export async function down() {
  await db.query('DROP TABLE IF EXISTS products;');
  console.log('Table dropped successfully!');
}
