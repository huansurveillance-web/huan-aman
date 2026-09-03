import {
  account,
  databases,
  storage,
  DATABASE_ID,
  BUCKET_ID,
  COLLECTIONS,
  ID,
  Query,
  fileViewUrl,
} from '../lib/appwrite';
import { BlogPost, CompanyStats, Product, QuoteLead, Review } from '../types';

// ---------- Auth ----------

export async function getCurrentAdmin() {
  try {
    return await account.get();
  } catch {
    return null;
  }
}

export async function adminLogin(email: string, password: string) {
  try {
    await account.deleteSession('current');
  } catch {
    // no existing session — fine
  }
  await account.createEmailPasswordSession(email, password);
  return account.get();
}

export async function adminLogout() {
  try {
    await account.deleteSession('current');
  } catch {
    // already logged out
  }
}

// ---------- Generic helpers ----------
// Appwrite documents come back with $id/$createdAt/etc. Our app's types use
// a plain `id` field, so every read maps $id -> id and drops the rest.

function fromDoc<T>(doc: any): T {
  const { $id, $createdAt, $updatedAt, $permissions, $collectionId, $databaseId, ...rest } = doc;
  return { id: $id, ...rest } as T;
}

function toPayload<T extends Record<string, any>>(data: Partial<T>) {
  const { id, ...rest } = data as any;
  return rest;
}

async function listAll<T>(collectionId: string): Promise<T[]> {
  const res = await databases.listDocuments(DATABASE_ID, collectionId, [
    Query.limit(500),
    Query.orderDesc('$createdAt'),
  ]);
  return res.documents.map((d) => fromDoc<T>(d));
}

// ---------- Products ----------
// `specs` is a Record<string,string> and `packageIncludes`/`features` may be
// arrays — Appwrite attributes are flat/typed, so specs travels as a JSON string.

function encodeProduct(data: Partial<Product>) {
  const payload = toPayload(data);
  if (payload.specs) payload.specs = JSON.stringify(payload.specs);
  return payload;
}

function decodeProduct(doc: any): Product {
  const mapped = fromDoc<Product>(doc);
  return { ...mapped, specs: mapped.specs ? JSON.parse(mapped.specs as any) : {} };
}

export const productsApi = {
  list: async (): Promise<Product[]> => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS.products, [
      Query.limit(500),
      Query.orderDesc('$createdAt'),
    ]);
    return res.documents.map(decodeProduct);
  },
  create: (id: string, data: Omit<Product, 'id'>) =>
    databases.createDocument(DATABASE_ID, COLLECTIONS.products, id, encodeProduct(data)),
  update: (id: string, data: Partial<Product>) =>
    databases.updateDocument(DATABASE_ID, COLLECTIONS.products, id, encodeProduct(data)),
  remove: (id: string) => databases.deleteDocument(DATABASE_ID, COLLECTIONS.products, id),
};

// ---------- Reviews ----------

export const reviewsApi = {
  list: () => listAll<Review>(COLLECTIONS.reviews),
  create: (id: string, data: Omit<Review, 'id'>) =>
    databases.createDocument(DATABASE_ID, COLLECTIONS.reviews, id, toPayload(data)),
  update: (id: string, data: Partial<Review>) =>
    databases.updateDocument(DATABASE_ID, COLLECTIONS.reviews, id, toPayload(data)),
  remove: (id: string) => databases.deleteDocument(DATABASE_ID, COLLECTIONS.reviews, id),
};

// ---------- Blog posts ----------

export const blogApi = {
  list: () => listAll<BlogPost>(COLLECTIONS.blogPosts),
  create: (id: string, data: Omit<BlogPost, 'id'>) =>
    databases.createDocument(DATABASE_ID, COLLECTIONS.blogPosts, id, toPayload(data)),
  update: (id: string, data: Partial<BlogPost>) =>
    databases.updateDocument(DATABASE_ID, COLLECTIONS.blogPosts, id, toPayload(data)),
  remove: (id: string) => databases.deleteDocument(DATABASE_ID, COLLECTIONS.blogPosts, id),
};

// ---------- Quote leads ----------
// `aiRecommendation` (object) and `cartItemsSummary` (array of objects) also
// travel as JSON strings for the same reason as `specs` above.

function encodeLead(data: Partial<QuoteLead>) {
  const payload = toPayload(data);
  if (payload.aiRecommendation) payload.aiRecommendation = JSON.stringify(payload.aiRecommendation);
  if (payload.cartItemsSummary) payload.cartItemsSummary = JSON.stringify(payload.cartItemsSummary);
  return payload;
}

function decodeLead(doc: any): QuoteLead {
  const mapped = fromDoc<QuoteLead>(doc);
  return {
    ...mapped,
    aiRecommendation: mapped.aiRecommendation ? JSON.parse(mapped.aiRecommendation as any) : undefined,
    cartItemsSummary: mapped.cartItemsSummary ? JSON.parse(mapped.cartItemsSummary as any) : undefined,
  };
}

export const leadsApi = {
  list: async (): Promise<QuoteLead[]> => {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTIONS.quoteLeads, [
      Query.limit(500),
      Query.orderDesc('$createdAt'),
    ]);
    return res.documents.map(decodeLead);
  },
  create: (id: string, data: Omit<QuoteLead, 'id'>) =>
    databases.createDocument(DATABASE_ID, COLLECTIONS.quoteLeads, id, encodeLead(data)),
  update: (id: string, data: Partial<QuoteLead>) =>
    databases.updateDocument(DATABASE_ID, COLLECTIONS.quoteLeads, id, encodeLead(data)),
  remove: (id: string) => databases.deleteDocument(DATABASE_ID, COLLECTIONS.quoteLeads, id),
};

// ---------- Company stats (single document, id = "main") ----------

export const companyStatsApi = {
  get: async (): Promise<CompanyStats | null> => {
    try {
      const doc = await databases.getDocument(DATABASE_ID, COLLECTIONS.companyStats, 'main');
      return fromDoc<CompanyStats>(doc);
    } catch {
      return null;
    }
  },
  upsert: async (data: Partial<CompanyStats>) => {
    const payload = toPayload(data);
    try {
      return await databases.updateDocument(DATABASE_ID, COLLECTIONS.companyStats, 'main', payload);
    } catch {
      return await databases.createDocument(DATABASE_ID, COLLECTIONS.companyStats, 'main', payload);
    }
  },
};

// ---------- Storage (product images, catalog PDFs) ----------

export async function uploadMediaFile(file: File): Promise<{ fileId: string; url: string }> {
  const uploaded = await storage.createFile(BUCKET_ID, ID.unique(), file);
  return { fileId: uploaded.$id, url: fileViewUrl(uploaded.$id) };
}

export async function deleteMediaFile(fileId: string): Promise<void> {
  await storage.deleteFile(BUCKET_ID, fileId);
}

// ---------- Quote lead backup webhook (Google Sheet + email) ----------
// Fire-and-forget: Appwrite database is the source of truth, the Apps
// Script webhook is just a human-readable backup + instant email alert.
export async function sendLeadToBackupSheet(payload: Record<string, unknown>) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL as string;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors', // Apps Script web apps don't return CORS headers; we don't need the response
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Non-critical — lead is already saved in Appwrite regardless.
  }
}
