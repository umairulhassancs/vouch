'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Clock, CheckCircle, Truck, ArrowRight, RefreshCw, AlertCircle, ShoppingBag } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  quantity: number;
}

interface OrderRecord {
  id: string;
  customerName: string;
  city: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  itemCount: number;
  createdAt: Date;
}

const statusColors = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  confirmed: 'bg-primary/10 text-primary border-primary/20',
  shipped: 'bg-teal/10 text-teal border-teal/20',
  delivered: 'bg-success/10 text-success border-success/20',
};

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  shipped: Truck,
  delivered: CheckCircle,
};

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: OrderRecord[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
          const itemsList = data.items || [];
          const count = itemsList.reduce((acc: number, curr: OrderItem) => acc + (curr.quantity || 1), 0);

          fetched.push({
            id: document.id,
            customerName: data.customerInfo?.name || 'Anonymous',
            city: data.customerInfo?.city || 'N/A',
            total: data.total || 0,
            status: data.status || 'pending',
            itemCount: count,
            createdAt: data.createdAt?.toDate?.() || new Date(),
          });
        });
        setOrders(fetched);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching orders:', err);
        setError('Failed to sync orders data from Firestore.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl min-h-[300px] flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Synchronizing operations orders logs...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">{orders.length} total orders placed</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {orders.length > 0 ? (
        <div className="rounded-2xl bg-surface-elevated border border-border/50 overflow-hidden shadow-xl shadow-black/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border/50 bg-surface/50">
                <tr>
                  {['Order ID', 'Customer', 'City', 'Items', 'Total', 'Status', 'Date', ''].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const StatusIcon = statusIcons[order.status] || Clock;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-border/30 hover:bg-surface-overlay/30 transition-colors"
                    >
                      <td className="px-5 py-4 font-mono text-xs text-primary font-semibold">
                        {order.id}
                      </td>
                      <td className="px-5 py-4 font-medium text-foreground">
                        {order.customerName}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {order.city}
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">
                        {order.itemCount}
                      </td>
                      <td className="px-5 py-4 font-semibold text-foreground">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            statusColors[order.status]
                          }`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span className="capitalize">{order.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/vendor/orders/${order.id}`}
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-xs font-semibold cursor-pointer"
                        >
                          View <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-12 rounded-3xl border border-dashed border-border/40 text-center bg-surface-elevated/20">
          <ShoppingBag className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-1">No Orders Found</h3>
          <p className="text-muted-foreground text-sm">
            Orders placed on the checkout checkout page will show up here automatically.
          </p>
        </div>
      )}
    </div>
  );
}
