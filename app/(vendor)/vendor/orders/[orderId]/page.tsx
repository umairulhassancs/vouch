'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, MapPin, Phone, Mail, ShoppingBag, Clock, CheckCircle, Truck, Shield, Save, AlertCircle, RefreshCw } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';

interface OrderItem {
  product: {
    name: string;
    slug: string;
    price: number;
    productType?: string;
  };
  quantity: number;
}

interface OrderDetails {
  orderId: string;
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

export default function VendorOrderDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const router = useRouter();

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'shipped' | 'delivered'>('pending');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrder() {
      try {
        setIsLoading(true);
        setError(null);

        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('Order not found in database.');
          setIsLoading(false);
          return;
        }

        const data = docSnap.data();
        const loaded: OrderDetails = {
          orderId: docSnap.id,
          customerInfo: data.customerInfo || {
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            postalCode: '',
            notes: '',
          },
          items: (data.items || []).map((item: any) => {
            if (item.productName) {
              return {
                product: {
                  name: item.productName,
                  slug: item.productSlug,
                  price: item.unitPrice,
                  productType: item.productType || '',
                },
                quantity: item.quantity,
              };
            }
            return item;
          }),
          subtotal: data.subtotal || 0,
          shippingFee: data.shippingFee || 0,
          total: data.total || 0,
          paymentMethod: data.paymentMethod || 'cod',
          status: data.status || 'pending',
          createdAt: data.createdAt?.toDate?.() || new Date(),
        };

        setOrder(loaded);
        setStatus(loaded.status);
      } catch (err: any) {
        console.error('Error fetching order details:', err);
        setError('Failed to fetch order information.');
      } finally {
        setIsLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  const handleUpdateStatus = async () => {
    setIsUpdating(true);
    setError(null);
    setSuccess(false);

    try {
      const docRef = doc(db, 'orders', orderId);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp(),
      });

      setSuccess(true);
      if (order) {
        setOrder({ ...order, status });
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error updating order status:', err);
      setError('Failed to save status modifications.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <RefreshCw className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Retrieving order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-danger" />
        </div>
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p className="text-muted-foreground text-sm mb-6">{error || 'Order logs could not be loaded.'}</p>
        <Link href="/vendor/orders" className="text-primary hover:underline text-sm font-semibold">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status] || Clock;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          href="/vendor/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left / Middle: Order Specs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="rounded-3xl bg-surface-elevated border border-border/50 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground font-semibold font-mono">
                  Order ID: {order.orderId}
                </span>
                <h1 className="text-xl font-bold font-[family-name:var(--font-display)] mt-2">
                  Order Details
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Placed on {order.createdAt.toLocaleString()}
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  statusColors[order.status]
                }`}
              >
                <StatusIcon className="w-4 h-4" />
                <span className="capitalize">{order.status}</span>
              </span>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="rounded-3xl bg-surface-elevated border border-border/50 p-6 space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Delivery Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-surface rounded-xl flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Recipient</p>
                  <p className="font-semibold">{order.customerInfo.name}</p>
                </div>
              </div>
              <div className="p-3 bg-surface rounded-xl flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground">Phone Number</p>
                  <a href={`tel:${order.customerInfo.phone}`} className="font-semibold text-primary hover:underline">
                    {order.customerInfo.phone}
                  </a>
                </div>
              </div>
              {order.customerInfo.email && (
                <div className="p-3 bg-surface rounded-xl flex items-center gap-3 sm:col-span-2">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Email Address</p>
                    <a href={`mailto:${order.customerInfo.email}`} className="font-semibold text-primary hover:underline">
                      {order.customerInfo.email}
                    </a>
                  </div>
                </div>
              )}
              <div className="p-3 bg-surface rounded-xl sm:col-span-2 space-y-1">
                <p className="text-[10px] text-muted-foreground">Shipping Address</p>
                <p className="font-medium text-foreground">{order.customerInfo.address}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {order.customerInfo.city} — {order.customerInfo.postalCode}
                </p>
              </div>
            </div>

            {order.customerInfo.notes && (
              <div className="p-4 bg-warning/5 border border-warning/10 rounded-xl">
                <p className="text-xs font-semibold text-warning">Delivery Instructions:</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{order.customerInfo.notes}</p>
              </div>
            )}
          </div>

          {/* Ordered items breakdown */}
          <div className="rounded-3xl bg-surface-elevated border border-border/50 p-6 space-y-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" /> Ordered Items
            </h2>

            <div className="divide-y divide-border/30">
              {order.items.map((item, index) => (
                <div key={index} className="py-3.5 flex justify-between items-center text-sm first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-foreground">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Quantity: {item.quantity} × {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="font-bold text-foreground">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border/40 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping Fee</span>
                <span>{order.shippingFee === 0 ? 'Free' : formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border/20">
                <span>Total Amount</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Status controls */}
        <div className="space-y-6">
          {/* Fulfillment Action Panel */}
          <div className="rounded-3xl bg-surface-elevated border border-border/50 p-6 space-y-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Fulfillment Control
            </h2>

            {success && (
              <div className="p-3 rounded-xl bg-success/10 border border-success/20 text-success text-xs flex items-center gap-1.5">
                <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                <span>Status saved successfully.</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-muted-foreground">Modify Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating || status === order.status}
              className="w-full py-3 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-primary/25"
            >
              {isUpdating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Modification
                </>
              )}
            </button>
          </div>

          {/* Payment Card Method */}
          <div className="rounded-3xl bg-surface-elevated border border-border/50 p-6 text-sm">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-teal/5 border border-teal/20">
              <CheckCircle className="w-6 h-6 text-teal shrink-0" />
              <div>
                <p className="font-semibold text-teal">Payment Method</p>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">
                  {order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Collect <strong>{formatPrice(order.total)}</strong> from customer upon delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
