'use client';

import React, { useEffect } from 'react';
import { onAuthChange } from '@/lib/firebase/auth';
import { db } from '@/lib/firebase/client';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthStore } from '@/store';
import type { VouchUser } from '@/types';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    let unsubscribeDoc: (() => void) | null = null;
    const unsubscribeAuth = onAuthChange(async (firebaseUser) => {
      if (unsubscribeDoc) {
        unsubscribeDoc();
        unsubscribeDoc = null;
      }

      if (firebaseUser) {
        // Set up session cookie on server
        try {
          const idToken = await firebaseUser.getIdToken();
          await fetch('/api/auth/session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
          });
        } catch (cookieErr) {
          console.error('Failed to establish server session:', cookieErr);
        }

        // 1. Set user state immediately from auth object so UI renders instantly
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          phone: firebaseUser.phoneNumber || '',
          photoURL: firebaseUser.photoURL || '',
          createdAt: new Date(),
          updatedAt: new Date(),
          plan: 'free',
          planExpiresAt: null,
          fcmTokens: [],
          notifyPush: true,
          notifyEmail: true,
          notifySMS: false,
          itemCount: 0,
          emailVerified: firebaseUser.emailVerified,
        } as VouchUser);
        setLoading(false);

        // 2. Load Firestore fields in the background
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        unsubscribeDoc = onSnapshot(userDocRef, (userSnap) => {
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: userData.displayName || firebaseUser.displayName || '',
              phone: userData.phone || '',
              photoURL: userData.photoURL || firebaseUser.photoURL || '',
              createdAt: userData.createdAt?.toDate?.() || new Date(),
              updatedAt: userData.updatedAt?.toDate?.() || new Date(),
              plan: userData.plan || 'free',
              planExpiresAt: userData.planExpiresAt?.toDate?.() || null,
              fcmTokens: userData.fcmTokens || [],
              notifyPush: userData.notifyPush !== undefined ? userData.notifyPush : true,
              notifyEmail: userData.notifyEmail !== undefined ? userData.notifyEmail : true,
              notifySMS: userData.notifySMS !== undefined ? userData.notifySMS : false,
              itemCount: userData.itemCount || 0,
              emailVerified: firebaseUser.emailVerified,
              emergencyName: userData.emergencyName || '',
              emergencyPhone: userData.emergencyPhone || '',
            } as VouchUser);
          }
        }, (error) => {
          console.error('Error listening to user doc snapshot:', error);
        });
      } else {
        // Clear session cookie on server
        try {
          await fetch('/api/auth/session', {
            method: 'DELETE',
          });
        } catch (cookieErr) {
          console.error('Failed to clear server session:', cookieErr);
        }

        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeDoc) {
        unsubscribeDoc();
      }
    };
  }, [setUser, setLoading]);

  return <>{children}</>;
}
