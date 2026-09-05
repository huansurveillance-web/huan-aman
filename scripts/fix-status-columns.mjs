// Run once: node scripts/fix-status-columns.mjs
import { Client, Databases } from 'node-appwrite';
import 'dotenv/config';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DB_ID = process.env.APPWRITE_DATABASE_ID;

async function main() {
  try {
    await databases.createStringAttribute(DB_ID, 'reviews', 'status', 20, false, 'approved');
    console.log('+ reviews.status created');
  } catch (e) {
    console.log('reviews.status:', e.message);
  }

  try {
    await databases.createStringAttribute(DB_ID, 'quote_leads', 'status', 20, false, 'new');
    console.log('+ quote_leads.status created');
  } catch (e) {
    console.log('quote_leads.status:', e.message);
  }
}

main();
