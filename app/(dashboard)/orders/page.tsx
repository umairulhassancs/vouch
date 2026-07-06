'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, CheckCircle, Truck, ChevronDown, ChevronUp, MapPin, Phone, AlertCircle, RefreshCw } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/hooks';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  productSlug: string;
  productName: string;
  productType?: string;
  quantity: number;
  unitPrice: number;
}

interface OrderRecord {
  id: string;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
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

export default function UserOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!user?.uid && !user?.email) {
      setOrders([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const parseDoc = (document: any): OrderRecord => {
      const data = document.data();
      return {
        id: document.id,
        customerInfo: data.customerInfo || {
          name: '', phone: '', email: '', address: '', city: '', postalCode: '', notes: '',
        },
        items: data.items || [],
        subtotal: data.subtotal || 0,
        shippingFee: data.shippingFee || 0,
        total: data.total || 0,
        paymentMethod: data.paymentMethod || 'cod',
        status: data.status || 'pending',
        createdAt: data.createdAt?.toDate?.() || new Date(),
      };
    };

    // Run BOTH userId and email queries simultaneously
    // This covers: new orders (have userId) + old orders (only have email, no userId)
    const seen = new Set<string>();
    let uidResults: OrderRecord[] = [];
    let emailResults: OrderRecord[] = [];
    let pendingCount = 2;
    const unsubscribes: (() => void)[] = [];

    const merge = () => {
      const combined: OrderRecord[] = [];
      for (const order of [...uidResults, ...emailResults]) {
        if (!seen.has(order.id)) {
          seen.add(order.id);
          combined.push(order);
        }
      }
      combined.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setOrders(combined);
      setIsLoading(false);
    };

    // Query 1: by userId
    if (user?.uid) {
      const q1 = query(collection(db, 'orders'), where('userId', '==', user.uid));
      const u1 = onSnapshot(q1, (snap) => {
        seen.clear();
        uidResults = snap.docs.map(parseDoc);
        merge();
      }, (err) => {
        console.error('userId query error:', err);
        pendingCount--;
        if (pendingCount <= 0) setIsLoading(false);
      });
      unsubscribes.push(u1);
    } else {
      pendingCount--;
    }

    // Query 2: by email
    if (user?.email) {
      const emailList = [
        user.email,
        user.email.toLowerCase(),
        user.email.trim(),
        user.email.toLowerCase().trim()
      ];
      const uniqueEmails = Array.from(new Set(emailList)).filter(Boolean);
      const q2 = query(collection(db, 'orders'), where('customerInfo.email', 'in', uniqueEmails));
      const u2 = onSnapshot(q2, (snap) => {
        seen.clear();
        emailResults = snap.docs.map(parseDoc);
        merge();
      }, (err) => {
        console.error('email query error:', err);
        pendingCount--;
        if (pendingCount <= 0) setIsLoading(false);
      });
      unsubscribes.push(u2);
    } else {
      pendingCount--;
    }

    if (pendingCount === 0) {
      setOrders([]);
      setIsLoading(false);
    }

    return () => unsubscribes.forEach((u) => u());
  }, [user?.uid, user?.email]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Order History</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track and manage your Vouch purchases
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="min-h-[250px] flex flex-col items-center justify-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mb-2" />
          <p className="text-muted-foreground text-xs">Retrieving order logs from database...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = statusIcons[order.status] || Clock;
            const isExpanded = !!expandedOrders[order.id];
            
            return (
              <div 
                key={order.id}
                className={`rounded-2xl bg-surface-elevated border transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-primary/30 shadow-md shadow-primary/5' : 'border-border/50'
                }`}
              >
                {/* Order Summary Header */}
                <div 
                  onClick={() => toggleExpand(order.id)}
                  className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-surface-overlay/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-foreground">{order.id}</span>
                        <span className="text-xs text-muted-foreground">• {order.createdAt.toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''} • {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        statusColors[order.status]
                      }`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      <span className="capitalize">{order.status}</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Expanded Detail Panel */}
                {isExpanded && (
                  <div className="border-t border-border/30 bg-surface/40 p-6 space-y-6">
                    {/* Item lines */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Items Ordered</h3>
                      <div className="divide-y divide-border/20 bg-surface-elevated/40 border border-border/30 rounded-xl p-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="py-2.5 flex justify-between items-center text-sm first:pt-0 last:pb-0">
                            <div>
                              <p className="font-semibold text-foreground">{item.productName || item.productSlug}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Quantity: {item.quantity} × {formatPrice(item.unitPrice)}
                              </p>
                            </div>
                            <span className="font-bold text-foreground">
                              {formatPrice(item.unitPrice * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping and Payment Info */}
                    <div className="grid sm:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-primary" /> Delivery Info
                        </h3>
                        <div className="text-xs space-y-1 bg-surface-elevated/30 rounded-xl p-4 border border-border/30">
                          <p className="font-semibold">{order.customerInfo.name}</p>
                          <p className="text-muted-foreground">{order.customerInfo.address}</p>
                          <p className="text-muted-foreground capitalize">
                            {order.customerInfo.city} — {order.customerInfo.postalCode}
                          </p>
                          <div className="flex items-center gap-3 pt-2 text-muted-foreground mt-1 border-t border-border/10">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {order.customerInfo.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Payment Breakdown</h3>
                        <div className="bg-surface-elevated/30 border border-border/30 rounded-xl p-4 space-y-2 text-xs">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span>Shipping Fee</span>
                            <span>{order.shippingFee === 0 ? 'Free' : formatPrice(order.shippingFee)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-foreground pt-2 border-t border-border/20">
                            <span>Total (COD)</span>
                            <span>{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {order.customerInfo.notes && (
                      <div className="p-3 bg-warning/5 border border-warning/10 rounded-xl text-xs">
                        <span className="font-semibold text-warning">Delivery Instructions:</span>
                        <p className="text-muted-foreground mt-0.5">{order.customerInfo.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-3xl border border-dashed border-border/40 text-center bg-surface-elevated/20">
          <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-1 font-[family-name:var(--font-display)]">No Orders Found</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            We couldn't find any orders placed under the email: <strong className="text-foreground font-mono">{user?.email}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
