import { Client, Account, Databases, Storage, Functions, ID, Query, Permission, Role } from 'appwrite';

// IMPORTANT: only VITE_-prefixed vars are exposed to the browser bundle by Vite.
// Never put APPWRITE_API_KEY (server secret) in a VITE_ variable — it must
// only ever be used server-side (scripts/setup-appwrite.mjs, Appwrite Functions).
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT as string;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID as string;

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string;
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID as string;
export const QUOTE_FUNCTION_ID = import.meta.env.VITE_APPWRITE_QUOTE_FUNCTION_ID as string;
export const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL as string;

export const COLLECTIONS = {
  products: 'products',
  reviews: 'reviews',
  blogPosts: 'blog_posts',
  quoteLeads: 'quote_leads',
  companyStats: 'company_stats',
} as const;

// Single shared client + services, used across the app.
export const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export { ID, Query, Permission, Role };

/**
 * Builds a public file URL for a stored image/PDF in the media bucket.
 * Safe to call from anywhere — does not require auth for public-read files.
 */
export function fileViewUrl(fileId: string): string {
  return storage.getFileView(BUCKET_ID, fileId).toString();
}
