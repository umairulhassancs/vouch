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
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import type { Notification } from '@/types';

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const q = query(
      collection(db, 'notifications'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedList: Notification[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
          fetchedList.push({
            notificationId: document.id,
            ownerId: data.ownerId,
            type: data.type,
            title: data.title,
            body: data.body,
            itemId: data.itemId || '',
            itemLabel: data.itemLabel || '',
            scanId: data.scanId || '',
            messageId: data.messageId || '',
            read: data.read !== undefined ? data.read : false,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            hasLocation: data.hasLocation || false,
            locationName: data.locationName || '',
            lat: data.lat || 0,
            lng: data.lng || 0,
          } as Notification);
        });
        // Sort in memory to avoid requiring a composite index
        fetchedList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        setNotifications(fetchedList);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error listening to notifications:', err);
        setError('Failed to fetch notifications.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    const docRef = doc(db, 'notifications', notificationId);
    await updateDoc(docRef, { read: true });
  };

  const markAllAsRead = async () => {
    if (!user || notifications.length === 0) return;
    const batch = writeBatch(db);
    notifications.forEach((n) => {
      if (!n.read) {
        const docRef = doc(db, 'notifications', n.notificationId);
        batch.update(docRef, { read: true });
      }
    });
    await batch.commit();
  };

  const deleteNotification = async (notificationId: string) => {
    const docRef = doc(db, 'notifications', notificationId);
    await deleteDoc(docRef);
  };

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
