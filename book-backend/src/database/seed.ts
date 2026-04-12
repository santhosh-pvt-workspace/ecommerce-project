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
      productName: 'iPhone 15 Pro',
      description: 'The latest iPhone with a titanium design and A17 Pro chip.',
      price: '999.00',
      stock: 50,
      brand: 'Apple',
      soldBy: 'Official Store',
      promotionLabel: 'New Arrival',
      rating: '4.9',
      tags: ['electronics', 'mobile', 'smartphone'],
      specialFor: 'Photography enthusiasts',
      categoryId: insertedCategories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400&auto=format&fit=crop',
    },
    {
      productName: 'Sony WH-1000XM5',
      description: 'Industry-leading noise cancelling headphones.',
      price: '349.00',
      stock: 30,
      brand: 'Sony',
      soldBy: 'Tech Hub',
      promotionLabel: 'Best Seller',
      rating: '4.8',
      tags: ['audio', 'headphones', 'wireless'],
      specialFor: 'Commuters and travelers',
      categoryId: insertedCategories[1].id,
      imageUrl: 'https://images.unsplash.com/photo-1618366712277-722055663761?q=80&w=400&auto=format&fit=crop',
    },
    {
      productName: 'Nike Air Max 270',
      description: 'Comfortable and stylish sneakers for everyday wear.',
      price: '150.00',
      stock: 100,
      brand: 'Nike',
      soldBy: 'Nike Official',
      promotionLabel: 'Clearance',
      rating: '4.6',
      tags: ['shoes', 'sneakers', 'lifestyle'],
      specialFor: 'Active lifestyle',
      categoryId: insertedCategories[2].id,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
    },
    {
      productName: 'Dyson V15 Detect',
      description: 'The most powerful, intelligent cordless vacuum.',
      price: '749.00',
      stock: 20,
      brand: 'Dyson',
      soldBy: 'Home Pro',
      promotionLabel: 'Hot Deal',
      rating: '4.7',
      tags: ['appliance', 'home', 'vacuum'],
      specialFor: 'Deep cleaning',
      categoryId: insertedCategories[3].id,
      imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=400&auto=format&fit=crop',
    },
    {
      productName: 'Organic Green Tea',
      description: 'Pure organic green tea leaves for a healthy lifestyle.',
      price: '12.50',
      stock: 200,
      brand: 'TeaGarden',
      soldBy: 'Organic Mart',
      ingredients: 'Organic green tea leaves',
      rating: '4.5',
      tags: ['grocery', 'drinks', 'organic'],
      specialFor: 'Weight management',
      categoryId: insertedCategories[4].id,
      imageUrl: 'https://images.unsplash.com/photo-1523920290228-4f321a939b4c?q=80&w=400&auto=format&fit=crop',
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
