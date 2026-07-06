'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, QrCode, Clock, Navigation, Laptop, Compass, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/hooks/useAuth';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

interface ScanLog {
  scanId: string;
  itemId: string;
  itemLabel?: string;
  scannedAt: Date;
  location: {
    lat: number;
    lng: number;
    city?: string;
    country?: string;
    permissionGranted: boolean;
  };
  device: {
    userAgent: string;
    platform: string;
  };
}

export default function TrackingPage() {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScan, setSelectedScan] = useState<ScanLog | null>(null);

  useEffect(() => {
    if (!user) {
      setScans([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const q = query(
      collection(db, 'scans'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedScans: ScanLog[] = [];
        snapshot.forEach((document) => {
          const data = document.data();
          fetchedScans.push({
            scanId: document.id,
            itemId: data.itemId,
            scannedAt: data.scannedAt?.toDate?.() || new Date(),
            location: data.location || { lat: 0, lng: 0, permissionGranted: false },
            device: data.device || { userAgent: 'Unknown', platform: 'Unknown' },
          });
        });
        // Sort in memory to avoid requiring a composite index
        fetchedScans.sort((a, b) => b.scannedAt.getTime() - a.scannedAt.getTime());
        setScans(fetchedScans);
        if (fetchedScans.length > 0) {
          setSelectedScan(fetchedScans[0]);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching scans:', err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Try to resolve item name locally from query if we want (optional) or display item ID
  const displayDevice = (userAgent: string) => {
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS Device';
    if (userAgent.includes('Android')) return 'Android Device';
    if (userAgent.includes('Windows')) return 'Windows PC';
    if (userAgent.includes('Macintosh')) return 'macOS Device';
    return 'Web Browser';
  };

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Live Tracking</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor the scan locations and finders of your protected items
        </p>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-3">
            {[1, 2].map((n) => (
              <div key={n} className="p-4 rounded-2xl bg-surface-elevated border border-border/50 animate-pulse h-20" />
            ))}
          </div>
          <div className="lg:col-span-2 rounded-3xl bg-surface-elevated border border-border/50 animate-pulse h-[400px]" />
        </div>
      ) : scans.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Scan list */}
          <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Scan History</h2>
            {scans.map((scan) => (
              <button
                key={scan.scanId}
                onClick={() => setSelectedScan(scan)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                  selectedScan?.scanId === scan.scanId
                    ? 'bg-primary/5 border-primary text-foreground'
                    : 'bg-surface-elevated border-border/50 hover:border-primary/20 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  selectedScan?.scanId === scan.scanId ? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                }`}>
                  <QrCode className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className="text-sm font-semibold truncate text-foreground">{scan.itemId}</p>
                    <span className="text-[10px] opacity-60 shrink-0 font-mono">
                      {scan.scannedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs truncate">
                    {scan.location.permissionGranted
                      ? `Lat: ${scan.location.lat.toFixed(4)}, Lng: ${scan.location.lng.toFixed(4)}`
                      : 'Location permission denied'}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Map view & Details */}
          <div className="lg:col-span-2 space-y-4">
            {selectedScan && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-surface-elevated border border-border/50 p-6 flex flex-col justify-between min-h-[400px]"
              >
                <div>
                  <div className="flex items-start justify-between border-b border-border/30 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold font-mono uppercase">
                        {selectedScan.scanId}
                      </span>
                      <h2 className="text-lg font-bold mt-1.5 font-[family-name:var(--font-display)]">
                        Item Scan Details
                      </h2>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="w-3.5 h-3.5" />
                        {selectedScan.scannedAt.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedScan.scannedAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 rounded-2xl bg-surface border border-border/50">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> Location Coordinates
                      </p>
                      {selectedScan.location.permissionGranted ? (
                        <div>
                          <p className="text-sm font-semibold">
                            Latitude: <span className="font-mono font-normal text-muted-foreground">{selectedScan.location.lat}</span>
                          </p>
                          <p className="text-sm font-semibold mt-0.5">
                            Longitude: <span className="font-mono font-normal text-muted-foreground">{selectedScan.location.lng}</span>
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground italic flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-warning shrink-0" />
                          Finder denied geolocation request.
                        </p>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-surface border border-border/50">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1.5">
                        <Laptop className="w-3.5 h-3.5 text-teal" /> Finder Device Info
                      </p>
                      <p className="text-sm font-semibold">{displayDevice(selectedScan.device.userAgent)}</p>
                      <p className="text-xs text-muted-foreground font-mono truncate mt-0.5">{selectedScan.device.platform}</p>
                    </div>
                  </div>

                  {/* Embed static map link or interactive maps */}
                  {selectedScan.location.permissionGranted && (
                    <div className="rounded-2xl overflow-hidden border border-border/50 h-52 relative group">
                      <iframe
                        title="Scan Location Map"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${selectedScan.location.lat},${selectedScan.location.lng}&z=15&output=embed`}
                        allowFullScreen
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent pointer-events-none transition-all" />
                    </div>
                  )}
                </div>

                {selectedScan.location.permissionGranted && (
                  <div className="mt-6 pt-4 border-t border-border/30">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedScan.location.lat},${selectedScan.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-lg shadow-primary/20"
                    >
                      <Navigation className="w-4 h-4" />
                      Open in Google Maps
                    </a>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/40 rounded-3xl p-6 bg-surface-elevated/30">
          <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center mb-4">
            <Compass className="w-7 h-7 text-muted-foreground/50" />
          </div>
          <h2 className="text-lg font-bold mb-1">No Scans Recorded</h2>
          <p className="text-sm text-muted-foreground max-w-xs mb-6">
            Your tracking logs are empty. Once your items are scanned by a finder, their details will display here.
          </p>
          <Link
            href="/items/activate"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer"
          >
            Activate an Item
          </Link>
        </div>
      )}
    </div>
  );
}
