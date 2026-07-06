'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Plus, QrCode, MoreVertical, MapPin, AlertTriangle, ShieldCheck, Trash2 } from 'lucide-react';
import { useItems } from '@/hooks';

const productTypeLabels: Record<string, string> = {
  sticker: 'QR Sticker',
  classic: 'Classic Keychain',
  whistle: 'Whistle Keychain',
  gps: 'GPS Smart Tracker',
};

export default function ItemsPage() {
  const { items, isLoading, updateItemStatus, deleteItem } = useItems();

  const handleToggleStatus = async (itemId: string, currentStatus: 'safe' | 'lost') => {
    try {
      const nextStatus = currentStatus === 'safe' ? 'lost' : 'safe';
      await updateItemStatus(itemId, nextStatus);
    } catch (error) {
      console.error('Error toggling item status:', error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (confirm('Are you sure you want to deactivate and remove this item?')) {
      try {
        await deleteItem(itemId);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">My Items</h1>
          <p className="text-muted-foreground text-sm mt-1">All your Vouch-protected belongings</p>
        </div>
        <Link
          href="/items/activate"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Link>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-5 rounded-2xl bg-surface-elevated border border-border/50 animate-pulse min-h-[160px]">
              <div className="w-10 h-10 rounded-xl bg-muted/20 mb-4" />
              <div className="h-4 bg-muted/20 rounded w-2/3 mb-2" />
              <div className="h-3 bg-muted/20 rounded w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.itemId}
              className={`p-5 rounded-2xl bg-surface-elevated border transition-all group relative flex flex-col justify-between min-h-[180px] ${
                item.status === 'lost'
                  ? 'border-danger/30 hover:border-danger/50 shadow-lg shadow-danger/5'
                  : 'border-border/50 hover:border-primary/20'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.status === 'lost' ? 'bg-danger/10' : 'bg-primary/10'
                    }`}
                  >
                    <QrCode className={`w-5 h-5 ${item.status === 'lost' ? 'text-danger' : 'text-primary'}`} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleStatus(item.itemId, item.status)}
                      title={item.status === 'lost' ? 'Mark as Safe' : 'Report as Lost'}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                        item.status === 'lost'
                          ? 'bg-danger/10 text-danger hover:bg-danger/20'
                          : 'bg-success/10 text-success hover:bg-success/20'
                      }`}
                    >
                      {item.status === 'lost' ? (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Lost
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Safe
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.itemId)}
                      title="Deactivate item"
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-danger/10 hover:text-danger text-muted-foreground transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <Link href={`/items/${item.itemId}`} className="block hover:opacity-85 transition-opacity cursor-pointer">
                  <h3 className="font-semibold mb-0.5">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {productTypeLabels[item.productType] || item.productType} •{' '}
                    <span className="font-mono text-muted-foreground/60">{item.itemId}</span>
                  </p>
                </Link>
              </div>

              {/* Stats / Footer */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30">
                <span className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  {item.scanCount} scan{item.scanCount !== 1 ? 's' : ''}
                </span>
                {item.lastLocation && (
                  <span className="flex items-center gap-1 text-teal font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.lastLocation.city || 'Scanned Location'}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Add item card */}
          <Link
            href="/items/activate"
            className="p-5 rounded-2xl border-2 border-dashed border-border/40 hover:border-primary/30 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:text-primary transition-all min-h-[180px] group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-muted/30 group-hover:bg-primary/10 flex items-center justify-center transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Activate New Item</span>
          </Link>
        </div>
      )}
    </div>
  );
}
