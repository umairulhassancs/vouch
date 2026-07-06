import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getMessaging } from 'firebase-admin/messaging';

import { db as clientDb } from './client';
import { 
  doc as clientDoc, 
  collection as clientCollection, 
  getDoc, 
  setDoc as clientSetDoc, 
  updateDoc, 
  deleteDoc, 
  writeBatch, 
  serverTimestamp as clientServerTimestamp,
  increment as clientIncrement
} from 'firebase/firestore';

let adminApp: any = null;
let adminDb: any = null;
let adminAuth: any = null;
let adminMessaging: any = null;

const hasAdminCreds = !!(
  process.env.FIREBASE_ADMIN_PROJECT_ID &&
  process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
  process.env.FIREBASE_ADMIN_PRIVATE_KEY
);

if (hasAdminCreds) {
  try {
    const adminApps = getApps();
    adminApp = adminApps.length === 0
      ? initializeApp({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          credential: cert({
            projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
          }),
        })
      : adminApps[0];
    adminDb = getFirestore(adminApp);
    adminAuth = getAuth(adminApp);
    adminMessaging = getMessaging(adminApp);
  } catch (err) {
    console.error('Failed to initialize real Firebase Admin SDK:', err);
  }
}

// Fallback to mocks if configuration is missing or initialization fails
if (!adminDb || !adminAuth || !adminMessaging) {
  console.warn('Firebase Admin credentials not set or invalid. Running in Mock/Demo mode for Admin SDK.');
  
  adminApp = adminApp || {};
  
  // Safe mock database chain using client-side Firestore connection as fallback
  const getClientDb = (): any => {
    if (clientDb) return clientDb;
    try {
      const clientModule = require('./client');
      return clientModule.db || clientModule.default?.db;
    } catch (e) {
      console.error('Failed to dynamically require client firebase module:', e);
      return null;
    }
  };

  const cleanMockData = (data: any): any => {
    if (data === null || data === undefined) return data;
    if (Array.isArray(data)) {
      return data.map(item => cleanMockData(item));
    }
    if (typeof data === 'object') {
      if (data._methodName === 'increment' || 'operand' in data) {
        return clientIncrement(data.operand !== undefined ? data.operand : 1);
      }
      if (data.constructor?.name === 'FieldValue' || data._methodName === 'serverTimestamp') {
        return clientServerTimestamp();
      }
      const result: any = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const val = data[key];
          if (val && typeof val === 'object') {
            if (val._methodName === 'increment' || 'operand' in val) {
              result[key] = clientIncrement(val.operand !== undefined ? val.operand : 1);
            } else if (val.constructor?.name === 'FieldValue' || val._methodName === 'serverTimestamp') {
              result[key] = clientServerTimestamp();
            } else {
              result[key] = cleanMockData(val);
            }
          } else {
            result[key] = cleanMockData(val);
          }
        }
      }
      return result;
    }
    return data;
  };

  const wrapDoc = (colName: string, docId?: string) => {
    const dbInstance = getClientDb();
    if (!dbInstance) {
      throw new Error('Firestore client DB is not initialized. Please verify your client configuration.');
    }

    const dRef = docId 
      ? clientDoc(dbInstance, `${colName}/${docId}`) 
      : clientDoc(clientCollection(dbInstance, colName));

    return {
      _dRef: dRef,
      get: async () => {
        const snap = await getDoc(dRef);
        return {
          exists: snap.exists(),
          data: () => snap.data(),
        };
      },
      set: async (data: any, options?: any) => {
        const cleaned = cleanMockData(data);
        return await clientSetDoc(dRef, cleaned, options);
      },
      update: async (data: any) => {
        const cleaned = cleanMockData(data);
        return await updateDoc(dRef, cleaned);
      },
      delete: async () => {
        return await deleteDoc(dRef);
      },
      collection: (subColName: string) => {
        const fullPath = docId ? `${colName}/${docId}/${subColName}` : `${colName}/${subColName}`;
        return {
          doc: (subDocId?: string) => wrapDoc(fullPath, subDocId),
        };
      }
    };
  };

  adminDb = adminDb || {
    collection: (colName: string) => ({
      doc: (docId?: string) => wrapDoc(colName, docId),
    }),
    batch: () => {
      const dbInstance = getClientDb();
      if (!dbInstance) {
        throw new Error('Firestore client DB is not initialized. Please verify your client configuration.');
      }
      const clientBatch = writeBatch(dbInstance);
      
      return {
        set: (docRefWrapper: any, data: any, options?: any) => {
          const cleaned = cleanMockData(data);
          clientBatch.set(docRefWrapper._dRef, cleaned, options);
        },
        update: (docRefWrapper: any, data: any) => {
          const cleaned = cleanMockData(data);
          clientBatch.update(docRefWrapper._dRef, cleaned);
        },
        delete: (docRefWrapper: any) => {
          clientBatch.delete(docRefWrapper._dRef);
        },
        commit: async () => {
          return await clientBatch.commit();
        }
      };
    }
  };

  adminAuth = adminAuth || {
    verifySessionCookie: async (cookie: string) => {
      return { uid: 'mock-vendor-uid', email: 'admin@vouch.pk' };
    },
    createSessionCookie: async () => 'mock-session-cookie',
    verifyIdToken: async (idToken: string) => {
      return { uid: 'mock-vendor-uid', email: 'admin@vouch.pk' };
    },
  };

  adminMessaging = adminMessaging || {
    sendEachForMulticast: async () => ({
      successCount: 0,
      failureCount: 0,
      responses: [],
    }),
  };
}

export { adminApp, adminDb, adminAuth, adminMessaging };
