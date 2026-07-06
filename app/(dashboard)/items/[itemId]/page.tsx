'use client';

import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Settings, QrCode, MapPin, Clock, ShieldAlert, ShieldCheck, AlertTriangle, Trash2, Calendar, Phone, RefreshCw } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { doc, getDoc, updateDoc, deleteDoc, collection, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface ScanLog {
  scanId: string;
  scannedAt: Date;
  location: {
    lat: number;
    lng: number;
    permissionGranted: boolean;
  };
  device: {
    userAgent: string;
    platform: string;
  };
}

export default function ItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = use(params);
  const router = useRouter();

  const [item, setItem] = useState<any>(null);
  const [scans, setScans] = useState<ScanLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadItemAndScans() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch item details
        const docRef = doc(db, 'items', itemId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('Item not found.');
          setIsLoading(false);
          return;
        }
        
        const itemData = docSnap.data();
        if (itemData && typeof itemData.scanCount !== 'number') {
          itemData.scanCount = itemData.scanCount && typeof itemData.scanCount === 'object' && itemData.scanCount.operand !== undefined 
            ? itemData.scanCount.operand 
            : 0;
        }
        setItem(itemData);

        // Fetch scans of this item
        const scansQuery = query(
          collection(db, 'scans'),
          where('itemId', '==', itemId)
        );
        const scansSnap = await getDocs(scansQuery);
        const fetchedScans: ScanLog[] = [];
        scansSnap.forEach((d) => {
          const s = d.data();
          fetchedScans.push({
            scanId: d.id,
            scannedAt: s.scannedAt?.toDate?.() || new Date(),
            location: s.location || { lat: 0, lng: 0, permissionGranted: false },
            device: s.device || { userAgent: 'Unknown', platform: 'Unknown' },
          });
        });
        // Sort in memory to avoid requiring a composite index
        fetchedScans.sort((a, b) => b.scannedAt.getTime() - a.scannedAt.getTime());
        setScans(fetchedScans);
      } catch (err: any) {
        console.error('Error loading item details:', err);
        setError('Failed to load item scan history.');
      } finally {
        setIsLoading(false);
      }
    }
    loadItemAndScans();
  }, [itemId]);

  const handleToggleStatus = async () => {
    if (!item) return;
    setIsUpdating(true);
    const nextStatus = item.status === 'safe' ? 'lost' : 'safe';
    try {
      const docRef = doc(db, 'items', itemId);
      await updateDoc(docRef, {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
      setItem({ ...item, status: nextStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update item status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteItem = async () => {
    if (confirm('Are you sure you want to deactivate and remove this item? This action is permanent.')) {
      try {
        const docRef = doc(db, 'items', itemId);
        await deleteDoc(docRef);
        router.push('/items');
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <Loader className="w-8 h-8 text-primary animate-spin mb-2" />
        <p className="text-muted-foreground text-sm">Retrieving item details...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8 text-danger" />
        </div>
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p className="text-muted-foreground text-sm mb-6">{error || 'Item details could not be retrieved.'}</p>
        <Link href="/items" className="text-primary hover:underline text-sm font-semibold">
          ← Back to Items List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/items"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Items
        </Link>
        <Link
          href={`/items/${itemId}/settings`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-xl text-xs font-semibold hover:bg-surface-overlay transition-all cursor-pointer"
        >
          <Settings className="w-4 h-4" /> Edit Settings
        </Link>
      </div>

      {/* Item summary card */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Left: General Info */}
        <div className="md:col-span-2 p-6 rounded-3xl bg-surface-elevated border border-border/50 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground font-semibold font-mono">
                  {itemId}
                </span>
                <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] mt-2">
                  {item.label}
                </h1>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  Product: {item.productType}
                </p>
              </div>

              {/* Status Badge Toggle */}
              <button
                onClick={handleToggleStatus}
                disabled={isUpdating}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 ${
                  item.status === 'lost'
                    ? 'bg-danger/10 text-danger hover:bg-danger/25'
                    : 'bg-success/10 text-success hover:bg-success/25'
                }`}
              >
                {item.status === 'lost' ? (
                  <>
                    <ShieldAlert className="w-4 h-4" /> Lost (Click to Mark Safe)
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" /> Safe (Click to Report Lost)
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/30 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Activated {item.createdAt ? new Date(item.createdAt.toDate ? item.createdAt.toDate() : item.createdAt).toLocaleDateString() : 'N/A'}
            </span>
            <span className="flex items-center gap-1.5">
              <QrCode className="w-4 h-4" />
              Scans recorded: {item.scanCount || 0}
            </span>
            <button
              onClick={handleDeleteItem}
              className="text-danger hover:underline cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Deactivate
            </button>
          </div>
        </div>

        {/* Right: Quick QR Display */}
        <div className="md:col-span-1 p-6 rounded-3xl bg-surface-elevated border border-border/50 flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white rounded-2xl mb-3">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=https://vouch.pk/scan/${itemId}`}
              alt="QR Code"
              width="110"
              height="110"
            />
          </div>
          <p className="text-xs font-semibold">Your Protection QR Code</p>
          <a
            href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://vouch.pk/scan/${itemId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-primary hover:underline mt-1"
          >
            Download Print Version
          </a>
        </div>
      </div>

      {/* Scan History / GPS Tracking details */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Scan logs list */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Scan Event Logs</h2>
          {scans.length > 0 ? (
            <div className="space-y-3">
              {scans.map((scan) => (
                <div
                  key={scan.scanId}
                  className="p-4 rounded-2xl bg-surface-elevated border border-border/50 flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-foreground">
                        {scan.location.permissionGranted ? 'Location Logged' : 'Scan (No GPS Granted)'}
                      </p>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {scan.scannedAt.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {scan.location.permissionGranted
                        ? `Lat: ${scan.location.lat.toFixed(5)}, Lng: ${scan.location.lng.toFixed(5)}`
                        : `Device: ${scan.device.platform || 'Unknown Web User'}`}
                    </p>
                    <span className="text-[10px] text-muted-foreground/60 block mt-1.5 font-mono">
                      {scan.scannedAt.toLocaleDateString()} • ID: {scan.scanId}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-3xl border border-dashed border-border/40 text-center bg-surface-elevated/20">
              <Clock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No scans registered for this item yet.</p>
            </div>
          )}
        </div>

        {/* Right: Map display */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Last Scanned</h2>
          {scans.length > 0 && scans.find((s) => s.location.permissionGranted) ? (
            (() => {
              const lastGPS = scans.find((s) => s.location.permissionGranted)!;
              return (
                <div className="rounded-3xl border border-border/50 overflow-hidden bg-surface-elevated p-4 flex flex-col justify-between h-[300px]">
                  <div className="rounded-xl overflow-hidden border border-border/30 h-44 mb-4 relative">
                    <iframe
                      title="Item Scan Location"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://maps.google.com/maps?q=${lastGPS.location.lat},${lastGPS.location.lng}&z=14&output=embed`}
                    />
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${lastGPS.location.lat},${lastGPS.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    Open in Google Maps
                  </a>
                </div>
              );
            })()
          ) : (
            <div className="p-8 rounded-3xl border border-dashed border-border/40 text-center bg-surface-elevated/20 h-[300px] flex flex-col items-center justify-center">
              <MapPin className="w-8 h-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground">No GPS coordinates available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Simple loader helper fallback
function Loader({ className }: { className?: string }) {
  return <RefreshCw className={`${className} animate-spin`} />;
}
