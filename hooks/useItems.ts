'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import type { Item, FinderSettings, ItemStatus } from '@/types';

export function useItems() {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const q = query(
      collection(db, 'items'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedItems: Item[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
          fetchedItems.push({
            itemId: document.id,
            ownerId: data.ownerId,
            label: data.label,
            productType: data.productType,
            status: data.status || 'safe',
            isActive: data.isActive !== undefined ? data.isActive : true,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            updatedAt: data.updatedAt?.toDate?.() || new Date(),
            scanCount: typeof data.scanCount === 'number' ? data.scanCount : (data.scanCount && typeof data.scanCount === 'object' && data.scanCount.operand !== undefined ? data.scanCount.operand : 0),
            lastScannedAt: data.lastScannedAt?.toDate?.() || null,
            lastLocation: data.lastLocation || null,
            finderSettings: data.finderSettings || {
              showFirstName: true,
              allowCall: false,
              showEmergency: false,
              emergencyName: '',
              emergencyPhone: '',
              customMessage: '',
            },
            gps: data.gps || null,
          } as Item);
        });
        // Sort in memory to avoid requiring a composite index
        fetchedItems.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setItems(fetchedItems);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error listening to items:', err);
        setError('Failed to fetch items.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const activateItem = async (itemId: string, label: string, productType: string) => {
    if (!user) throw new Error('You must be signed in to activate items.');
    const trimmedId = itemId.trim().toUpperCase();

    const itemRef = doc(db, 'items', trimmedId);
    const itemSnap = await getDoc(itemRef);

    if (!itemSnap.exists()) {
      throw new Error('This QR Code is not recognized. Only official Vouch QR codes can be activated.');
    }

    const data = itemSnap.data();
    if (data && data.ownerId && data.ownerId !== user.uid) {
      throw new Error('This item is already registered to another owner.');
    }

    // Set or overwrite the document
    await setDoc(itemRef, {
      ownerId: user.uid,
      label,
      productType,
      status: 'safe',
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      scanCount: 0,
      lastScannedAt: null,
      lastLocation: null,
      finderSettings: {
        showFirstName: true,
        allowCall: false,
        showEmergency: false,
        emergencyName: '',
        emergencyPhone: '',
        customMessage: '',
      },
    }, { merge: true });
  };

  const updateItemSettings = async (itemId: string, settings: Partial<FinderSettings>) => {
    const itemRef = doc(db, 'items', itemId);
    await updateDoc(itemRef, {
      finderSettings: settings,
      updatedAt: serverTimestamp(),
    });
  };

  const updateItemStatus = async (itemId: string, status: ItemStatus) => {
    const itemRef = doc(db, 'items', itemId);
    await updateDoc(itemRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  };

  const deleteItem = async (itemId: string) => {
    const itemRef = doc(db, 'items', itemId);
    await updateDoc(itemRef, {
      ownerId: null,
      label: 'Unassigned Vouch Tag',
      isActive: false,
      status: 'safe',
      scanCount: 0,
      lastScannedAt: null,
      lastLocation: null,
      updatedAt: serverTimestamp(),
      finderSettings: {
        showFirstName: true,
        allowCall: false,
        showEmergency: false,
        emergencyName: '',
        emergencyPhone: '',
        customMessage: '',
      }
    });
  };

  return {
    items,
    isLoading,
    error,
    activateItem,
    updateItemSettings,
    updateItemStatus,
    deleteItem,
  };
}
