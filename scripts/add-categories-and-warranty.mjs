// Run once: node scripts/add-categories-and-warranty.mjs
import { Client, Databases, Permission, Role, ID } from 'node-appwrite';
import 'dotenv/config';

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DB_ID = process.env.APPWRITE_DATABASE_ID;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const DEFAULT_CATEGORIES = [
  { value: 'dome', label: 'Dome & Turret' },
  { value: 'bullet', label: 'Bullet Camera' },
  { value: 'ptz', label: 'Speed Dome PTZ' },
  { value: 'nvr', label: 'NVR Recorder' },
  { value: 'fiber', label: 'Fiber Optic Gear' },
  { value: 'control-room', label: 'Command Center Video Wall' },
  { value: 'access', label: 'Access Control' },
  { value: 'package', label: 'Turnkey Package' },
];

async function main() {
  // 1) warranty column on products
  try {
    await databases.createStringAttribute(DB_ID, 'products', 'warranty', 200, false);
    console.log('+ products.warranty created');
  } catch (e) {
    console.log('products.warranty:', e.message);
  }

  // 2) categories collection
  try {
    await databases.getCollection(DB_ID, 'categories');
    console.log('= categories collection already exists');
  } catch {
    await databases.createCollection(DB_ID, 'categories', 'Categories', [
      Permission.read(Role.any()),
      Permission.create(Role.users()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ], false);
    console.log('+ categories collection created');
    await sleep(1000);

    await databases.createStringAttribute(DB_ID, 'categories', 'value', 100, true);
    await sleep(500);
    await databases.createStringAttribute(DB_ID, 'categories', 'label', 150, true);
    await sleep(1500);

    for (const cat of DEFAULT_CATEGORIES) {
      try {
        await databases.createDocument(DB_ID, 'categories', ID.unique(), cat);
        console.log(`  + seeded category: ${cat.label}`);
      } catch (e) {
        console.log(`  seed ${cat.label} failed:`, e.message);
      }
    }
  }

  console.log('\nDone.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
