'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Truck, Shield, CheckCircle, LogIn } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, generateOrderId } from '@/lib/utils';
import { useAuth } from '@/hooks';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShippingFee, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect to login if not authenticated and auth state has resolved
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login?returnUrl=/checkout');
    }
  }, [isLoading, isAuthenticated, router]);

  // Pre-fill email from logged-in user so orders are reliably linked to their account
  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[\d+\-() ]{7,15}$/.test(form.phone)) newErrors.phone = 'Enter a valid phone number';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: {
            name: form.name,
            phone: form.phone,
            email: form.email,
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
          },
          // Pass the logged-in user's UID so orders are linked to their account
          // regardless of what email address was typed in the form
          userId: user?.uid || null,
          items: items.map((item) => ({
            productSlug: item.product.slug,
            quantity: item.quantity,
          })),
          notes: form.notes,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Order submission failed' }));
        throw new Error(errData.error || 'Failed to submit order.');
      }

      const data = await res.json();
      clearCart();
      router.push(`/order-confirmation/${data.orderId}`);
    } catch (err: any) {
      console.error('Error placing order:', err);
      alert(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-muted-foreground font-medium">Verifying account security...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-primary hover:underline">← Browse Products</Link>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-surface border rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
      errors[field] ? 'border-danger' : 'border-border'
    }`;

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pt-4">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] tracking-tight mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Form */}
            <div className="space-y-8">
              {/* Delivery Information */}
              <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6">
                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" />
                  Delivery Information
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass('name')}
                      placeholder="Ahmed Raza"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && <p className="text-xs text-danger mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={inputClass('phone')}
                      placeholder="0300 1234567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Email{' '}
                      {isAuthenticated && user?.email ? (
                        <span className="text-success text-xs font-normal">✓ Linked to your account</span>
                      ) : (
                        <span className="text-muted-foreground/50">(optional — for order history)</span>
                      )}
                    </label>
                    <input
                      type="email"
                      className={`${inputClass('email')} ${isAuthenticated && user?.email ? 'opacity-70 cursor-not-allowed bg-surface/60' : ''}`}
                      placeholder="ahmed@email.com"
                      value={form.email}
                      readOnly={!!(isAuthenticated && user?.email)}
                      onChange={(e) => !isAuthenticated && setForm({ ...form, email: e.target.value })}
                    />
                    {isAuthenticated && user?.email && (
                      <p className="text-xs text-muted-foreground mt-1">
                        This order will appear in your <strong>Order History</strong> dashboard automatically.
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Delivery Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass('address')}
                      placeholder="House #12, Street 5, G-11/3"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                    {errors.address && <p className="text-xs text-danger mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass('city')}
                      placeholder="Islamabad"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                    {errors.city && <p className="text-xs text-danger mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                      Postal Code <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={inputClass('postalCode')}
                      placeholder="44000"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    />
                    {errors.postalCode && <p className="text-xs text-danger mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Order Notes (Optional)</h2>
                <textarea
                  rows={3}
                  className={inputClass('notes')}
                  placeholder="Any special instructions for delivery..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>

              {/* Payment Method */}
              <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Payment Method
                </h2>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-teal/5 border border-teal/20">
                  <CheckCircle className="w-6 h-6 text-teal flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-teal">Cash on Delivery (COD)</p>
                    <p className="text-sm text-muted-foreground">
                      Pay cash when your order arrives at your doorstep. No online payment required.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.slug} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t border-border/50 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{getShippingFee() === 0 ? <span className="text-success">Free</span> : formatPrice(getShippingFee())}</span>
                  </div>
                </div>

                <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border/50 mb-6">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary/90 transition-all active:scale-[0.97] shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Placing Order...
                    </>
                  ) : (
                    `Place Order — ${formatPrice(getTotal())}`
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  💵 You will pay {formatPrice(getTotal())} cash on delivery
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
