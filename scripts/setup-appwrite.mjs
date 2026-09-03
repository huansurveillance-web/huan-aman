// Run once, locally: npm run setup:appwrite
// Reads APPWRITE_ENDPOINT / APPWRITE_PROJECT_ID / APPWRITE_API_KEY / APPWRITE_DATABASE_ID /
// APPWRITE_BUCKET_ID from .env (server-only vars — NOT the VITE_ prefixed ones).
// This key never touches the browser bundle or git; it only runs on your machine.

import { Client, Databases, Storage, Permission, Role } from 'node-appwrite';
import 'dotenv/config';

const required = ['APPWRITE_ENDPOINT', 'APPWRITE_PROJECT_ID', 'APPWRITE_API_KEY', 'APPWRITE_DATABASE_ID', 'APPWRITE_BUCKET_ID'];
for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing ${key} in .env — see .env.example`);
    process.exit(1);
  }
}

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const storage = new Storage(client);
const DB_ID = process.env.APPWRITE_DATABASE_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Public data (products, reviews, blog, stats) is readable by anyone.
// Only a logged-in admin (has an Appwrite Auth account) can write.
const PUBLIC_READ_ADMIN_WRITE = [
  Permission.read(Role.any()),
  Permission.create(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];

// Quote leads: any visitor can submit (create), only admin can read/manage.
const LEAD_PERMISSIONS = [
  Permission.create(Role.any()),
  Permission.read(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];

async function ensureCollection(id, name, permissions) {
  try {
    await databases.getCollection(DB_ID, id);
    console.log(`- collection "${id}" already exists, skipping create`);
  } catch {
    await databases.createCollection(DB_ID, id, name, permissions, false);
    console.log(`+ created collection "${id}"`);
    await sleep(500);
  }
}

async function ensureStringAttr(collectionId, key, size, required = false, array = false, defaultVal) {
  try {
    await databases.createStringAttribute(DB_ID, collectionId, key, size, required, array ? undefined : defaultVal, array);
    console.log(`  + attr ${collectionId}.${key} (string)`);
  } catch (e) {
    console.log(`  = attr ${collectionId}.${key} skipped (${e.message})`);
  }
  await sleep(300);
}

async function ensureFloatAttr(collectionId, key, required = false, defaultVal) {
  try {
    await databases.createFloatAttribute(DB_ID, collectionId, key, required, undefined, undefined, defaultVal);
    console.log(`  + attr ${collectionId}.${key} (float)`);
  } catch (e) {
    console.log(`  = attr ${collectionId}.${key} skipped (${e.message})`);
  }
  await sleep(300);
}

async function ensureIntAttr(collectionId, key, required = false, defaultVal) {
  try {
    await databases.createIntegerAttribute(DB_ID, collectionId, key, required, undefined, undefined, defaultVal);
    console.log(`  + attr ${collectionId}.${key} (int)`);
  } catch (e) {
    console.log(`  = attr ${collectionId}.${key} skipped (${e.message})`);
  }
  await sleep(300);
}

async function ensureBoolAttr(collectionId, key, required = false, defaultVal) {
  try {
    await databases.createBooleanAttribute(DB_ID, collectionId, key, required, defaultVal);
    console.log(`  + attr ${collectionId}.${key} (bool)`);
  } catch (e) {
    console.log(`  = attr ${collectionId}.${key} skipped (${e.message})`);
  }
  await sleep(300);
}

async function main() {
  console.log('Provisioning HUAN Surveillance Appwrite backend...\n');

  // ---- products ----
  await ensureCollection('products', 'Products', PUBLIC_READ_ADMIN_WRITE);
  await ensureStringAttr('products', 'name', 200, true);
  await ensureStringAttr('products', 'category', 50, true);
  await ensureStringAttr('products', 'brand', 100, true);
  await ensureStringAttr('products', 'modelNumber', 100, true);
  await ensureFloatAttr('products', 'price', true);
  await ensureBoolAttr('products', 'isPriceOnQuote', false, false);
  await ensureStringAttr('products', 'shortDescription', 1000, true);
  await ensureStringAttr('products', 'description', 5000, true);
  await ensureStringAttr('products', 'specs', 5000, false); // JSON string
  await ensureStringAttr('products', 'features', 300, false, true); // array
  await ensureStringAttr('products', 'imageUrl', 2000, true);
  await ensureStringAttr('products', 'badge', 100, false);
  await ensureBoolAttr('products', 'isPackage', false, false);
  await ensureStringAttr('products', 'packageIncludes', 300, false, true); // array
  await ensureBoolAttr('products', 'inStock', false, true);
  await ensureFloatAttr('products', 'rating', false, 5);
  await ensureIntAttr('products', 'reviewCount', false, 0);

  // ---- reviews ----
  await ensureCollection('reviews', 'Reviews', PUBLIC_READ_ADMIN_WRITE);
  await ensureStringAttr('reviews', 'authorName', 150, true);
  await ensureStringAttr('reviews', 'companyOrRole', 150, false);
  await ensureStringAttr('reviews', 'city', 100, false);
  await ensureStringAttr('reviews', 'serviceType', 100, false);
  await ensureFloatAttr('reviews', 'rating', true);
  await ensureStringAttr('reviews', 'date', 30, true);
  await ensureStringAttr('reviews', 'comment', 3000, true);
  await ensureBoolAttr('reviews', 'verified', false, true);
  await ensureStringAttr('reviews', 'status', 20, true, false, 'approved');
  await ensureBoolAttr('reviews', 'featured', false, false);

  // ---- blog_posts ----
  await ensureCollection('blog_posts', 'Blog Posts', PUBLIC_READ_ADMIN_WRITE);
  await ensureStringAttr('blog_posts', 'slug', 200, true);
  await ensureStringAttr('blog_posts', 'title', 300, true);
  await ensureStringAttr('blog_posts', 'excerpt', 1000, true);
  await ensureStringAttr('blog_posts', 'content', 20000, true);
  await ensureStringAttr('blog_posts', 'category', 100, true);
  await ensureStringAttr('blog_posts', 'author', 100, true);
  await ensureStringAttr('blog_posts', 'date', 30, true);
  await ensureStringAttr('blog_posts', 'readTime', 30, false);
  await ensureStringAttr('blog_posts', 'imageUrl', 2000, false);
  await ensureStringAttr('blog_posts', 'tags', 100, false, true); // array

  // ---- quote_leads ----
  await ensureCollection('quote_leads', 'Quote Leads', LEAD_PERMISSIONS);
  await ensureStringAttr('quote_leads', 'createdAt', 40, true);
  await ensureStringAttr('quote_leads', 'customerName', 150, true);
  await ensureStringAttr('quote_leads', 'email', 150, true);
  await ensureStringAttr('quote_leads', 'phone', 40, true);
  await ensureStringAttr('quote_leads', 'city', 100, true);
  await ensureStringAttr('quote_leads', 'address', 300, false);
  await ensureStringAttr('quote_leads', 'serviceCategory', 50, true);
  await ensureStringAttr('quote_leads', 'propertyType', 100, true);
  await ensureStringAttr('quote_leads', 'estimatedAreaOrPoints', 100, true);
  await ensureStringAttr('quote_leads', 'cameraCountOrScale', 100, true);
  await ensureStringAttr('quote_leads', 'budgetTier', 30, true);
  await ensureStringAttr('quote_leads', 'indoorOutdoorRequirement', 100, true);
  await ensureStringAttr('quote_leads', 'timeline', 100, true);
  await ensureStringAttr('quote_leads', 'additionalNotes', 2000, false);
  await ensureStringAttr('quote_leads', 'aiRecommendation', 6000, false); // JSON string
  await ensureStringAttr('quote_leads', 'cartItemsSummary', 4000, false); // JSON string
  await ensureStringAttr('quote_leads', 'status', 20, true, false, 'new');
  await ensureStringAttr('quote_leads', 'assignedTo', 100, false);
  await ensureStringAttr('quote_leads', 'notes', 2000, false);
  await ensureFloatAttr('quote_leads', 'quoteAmount', false);

  // ---- company_stats (single document collection) ----
  await ensureCollection('company_stats', 'Company Stats', PUBLIC_READ_ADMIN_WRITE);
  await ensureIntAttr('company_stats', 'yearsInBusiness', false, 0);
  await ensureIntAttr('company_stats', 'sitesCompleted', false, 0);
  await ensureIntAttr('company_stats', 'sectorsServed', false, 0);
  await ensureStringAttr('company_stats', 'karachiResolutionHours', 30, false);
  await ensureStringAttr('company_stats', 'uptimeSLA', 30, false);
  await ensureIntAttr('company_stats', 'activeClients', false, 0);
  await ensureStringAttr('company_stats', 'ntnNumber', 50, false);
  await ensureStringAttr('company_stats', 'fbrStatus', 100, false);
  await ensureStringAttr('company_stats', 'salesTaxNumber', 50, false);
  await ensureStringAttr('company_stats', 'companyAddress', 300, false);
  await ensureStringAttr('company_stats', 'primaryPhone', 30, false);
  await ensureStringAttr('company_stats', 'secondaryPhone', 30, false);
  await ensureStringAttr('company_stats', 'whatsappNumber', 30, false);
  await ensureStringAttr('company_stats', 'email', 100, false);
  await ensureStringAttr('company_stats', 'salesEmail', 100, false);
  await ensureStringAttr('company_stats', 'website', 200, false);
  await ensureStringAttr('company_stats', 'slogan', 200, false);
  await ensureStringAttr('company_stats', 'coverageArea', 200, false);
  await ensureStringAttr('company_stats', 'notableClient', 200, false);

  // ---- storage bucket permissions ----
  try {
    await storage.updateBucket(
      BUCKET_ID,
      'HUAN Media',
      [Permission.read(Role.any()), Permission.create(Role.users()), Permission.update(Role.users()), Permission.delete(Role.users())],
      false,
      true,
      undefined,
      undefined,
      true,
    );
    console.log('\n+ bucket permissions set (public read, admin write)');
  } catch (e) {
    console.log(`\n= bucket permission update skipped: ${e.message}`);
  }

  console.log('\nDone. Now create your admin login user:');
  console.log('Appwrite Console > Auth > Users > Create user, with the email you gave me.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
