import { NextRequest, NextResponse } from 'next/server';
import { adminDb, FieldValue } from '@/lib/firebase/admin';
import { z } from 'zod';

const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email().or(z.literal('')).optional().default(''),
    address: z.string().min(1),
    city: z.string().min(1),
    postalCode: z.string().min(1),
  }),
  userId: z.string().min(1),
  items: z.array(
    z.object({
      productSlug: z.string().min(1),
      quantity: z.number().int().min(1),
    })
  ).min(1),
  notes: z.string().optional().default(''),
});

const PRODUCT_METADATA: Record<string, { name: string; price: number; productType: string }> = {
  'qr-sticker': { name: 'QR Sticker', price: 199, productType: 'sticker' },
  'classic-keychain': { name: 'Classic Keychain', price: 299, productType: 'classic' },
  'whistle-keychain': { name: 'Whistle Keychain', price: 1299, productType: 'whistle' },
  'gps-ring-keychain': { name: 'GPS Ring Keychain', price: 2999, productType: 'gps' },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = createOrderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }

    const { customer, items, notes, userId } = result.data;

    let subtotal = 0;
    const orderItems = [];

    // Calculate subtotal using server-side prices
    for (const item of items) {
      const meta = PRODUCT_METADATA[item.productSlug];
      if (!meta) {
        return NextResponse.json({ error: `Product not found: ${item.productSlug}` }, { status: 400 });
      }

      subtotal += meta.price * item.quantity;
      orderItems.push({
        productSlug: item.productSlug,
        productName: meta.name,
        productType: meta.productType,
        quantity: item.quantity,
        unitPrice: meta.price,
      });
    }

    const shippingFee = subtotal >= 2000 ? 0 : 200;
    const total = subtotal + shippingFee;

    const orderId = 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = FieldValue.serverTimestamp();

    // Create order document in firestore
    const orderRef = adminDb.collection('orders').doc(orderId);
    await orderRef.set({
      orderId,
      createdAt: timestamp,
      updatedAt: timestamp,
      status: 'pending',
      paymentMethod: 'cod',
      // userId links order to logged-in user's account for reliable dashboard queries
      userId: userId || null,
      customerInfo: {
        name: customer.name,
        phone: customer.phone,
        email: (customer.email || '').toLowerCase().trim(),
        address: customer.address,
        city: customer.city,
        postalCode: customer.postalCode,
        notes: notes || '',
      },
      items: orderItems,
      subtotal,
      shippingFee,
      total,
    });

    // Optionally send email confirmation if customer left an email address
    if (customer.email && customer.email.trim().length > 0) {
      console.log(`Email Alert: Order Confirmation dispatched to ${customer.email} for order ${orderId}`);
      // Resend template or dispatch logic can be wired here or in Phase 9
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error: any) {
    console.error('Create Order API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
