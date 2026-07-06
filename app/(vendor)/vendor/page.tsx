'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, TrendingUp, Clock, CheckCircle, ArrowRight, Loader, RefreshCw, ShoppingBag } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { formatPrice } from '@/lib/utils';

interface OrderLog {
  orderId: string;
  customerInfo: {
    name: string;
    city: string;
  };
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

export default function VendorDashboardPage() {
  const [orders, setOrders] = useState<OrderLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: OrderLog[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
          fetched.push({
            orderId: document.id,
            customerInfo: data.customerInfo || { name: 'Anonymous', city: 'Unknown' },
            total: data.total || 0,
            status: data.status || 'pending',
            createdAt: data.createdAt?.toDate?.() || new Date(),
          });
        });
        setOrders(fetched);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching vendor orders stats:', err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const shippedCount = orders.filter((o) => o.status === 'shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  const stats = [
    { label: 'Total Orders', value: totalCount, icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pending Fulfillment', value: pendingCount, icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
    { label: 'Shipped Orders', value: shippedCount, icon: TrendingUp, color: 'text-teal', bg: 'bg-teal/10' },
    { label: 'Delivered Packages', value: deliveredCount, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  ];

  if (isLoading) {
    return (
      <div className="max-w-4xl min-h-[300px] flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Loading operations panel...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Vendor Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your Vouch order operations</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="p-5 rounded-2xl bg-surface-elevated border border-border/50 transition-all hover:border-primary/20">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold font-[family-name:var(--font-display)]">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-surface-elevated border border-border/50 p-8 text-center max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-6 h-6 text-primary" />
        </div>
        <h2 className="font-bold mb-1">Fulfillment Dashboard</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Track customer payments, dispatch logistics packages, and confirm delivery states.
        </p>
        <Link
          href="/vendor/orders"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/25"
        >
          <Package className="w-4 h-4" /> Go to Order List <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
