import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { categoryTable } from './schema/config.schema';
import { productTable } from './schema/product.schema';

config(); // load .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  console.log('🌱 Seeding Database...');

  console.log('🧹 Clearing existing data...');
  await db.delete(productTable);
  await db.delete(categoryTable);

  console.log('📚 Inserting categories...');
  const categoriesToInsert = [
    { name: 'Fiction', code: 'FIC' },
    { name: 'Non-Fiction', code: 'NFIC' },
    { name: 'Science Fiction', code: 'SCI' },
    { name: 'Fantasy', code: 'FAN' },
    { name: 'Mystery', code: 'MYS' },
  ];

  const insertedCategories = await db
    .insert(categoryTable)
    .values(categoriesToInsert)
    .returning();

  console.log('📕 Inserting products...');
  const productsToInsert = [
    {
      title: 'The Great Gatsby',
      description: 'A novel written by American author F. Scott Fitzgerald.',
      price: '15.99',
      stock: 100,
      author: 'F. Scott Fitzgerald',
      categoryId: insertedCategories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Sapiens',
      description: 'A Brief History of Humankind.',
      price: '22.50',
      stock: 50,
      author: 'Yuval Noah Harari',
      categoryId: insertedCategories[1].id,
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'Dune',
      description: 'A 1965 epic science fiction novel by Frank Herbert.',
      price: '18.99',
      stock: 75,
      author: 'Frank Herbert',
      categoryId: insertedCategories[2].id,
      imageUrl: 'https://images.unsplash.com/photo-1614278458793-19ebcc1e1ec0?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'The Hobbit',
      description: 'A children\'s fantasy novel by J. R. R. Tolkien.',
      price: '14.25',
      stock: 120,
      author: 'J. R. R. Tolkien',
      categoryId: insertedCategories[3].id,
      imageUrl: 'https://images.unsplash.com/photo-1629196914562-1262dce02be9?q=80&w=400&auto=format&fit=crop',
    },
    {
      title: 'The Girl with the Dragon Tattoo',
      description: 'A psychological thriller novel by Swedish author and journalist Stieg Larsson.',
      price: '16.50',
      stock: 60,
      author: 'Stieg Larsson',
      categoryId: insertedCategories[4].id,
      imageUrl: 'https://images.unsplash.com/photo-1587876931567-564ce588bfbd?q=80&w=400&auto=format&fit=crop',
    },
  ];

  await db.insert(productTable).values(productsToInsert);

  console.log('✅ Seeding complete!');
  await pool.end();
}

main().catch((err) => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
