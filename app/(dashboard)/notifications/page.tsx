'use client';

import React from 'react';
import { Bell, CheckCircle, Trash2, ShieldAlert, MessageSquare, MapPin, Eye, Info, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/hooks';

function timeAgo(date: Date) {
  const diffMs = new Date().getTime() - date.getTime();
  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 0) return 'just now';
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export default function NotificationsPage() {
  const { notifications, isLoading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time status updates and finder logs for your items
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated border border-border rounded-xl text-xs font-semibold hover:bg-surface-overlay transition-all cursor-pointer"
          >
            <CheckCircle className="w-4 h-4 text-success" />
            Mark all read
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-4 rounded-2xl bg-surface-elevated border border-border/50 animate-pulse h-20" />
          ))}
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {notifications.map((n) => {
              const Icon = n.type === 'scan' ? MapPin : n.type === 'message' ? MessageSquare : ShieldAlert;
              const typeColor =
                n.type === 'scan'
                  ? 'text-primary bg-primary/10'
                  : n.type === 'message'
                  ? 'text-teal bg-teal/10'
                  : 'text-warning bg-warning/10';

              return (
                <motion.div
                  key={n.notificationId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-4 relative group ${
                    n.read
                      ? 'bg-surface-elevated/60 border-border/40'
                      : 'bg-surface-elevated border-primary/20 shadow-md shadow-primary/2'
                  }`}
                >
                  {/* Unread indicator dot */}
                  {!n.read && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                  )}

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${typeColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0 pr-8">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className={`text-sm font-semibold truncate ${n.read ? 'text-foreground/80' : 'text-foreground'}`}>
                        {n.title}
                      </h3>
                      {n.itemLabel && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/30 text-muted-foreground font-medium shrink-0">
                          {n.itemLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-1.5">{n.body}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {timeAgo(n.createdAt)}
                      </span>
                      {n.hasLocation && n.locationName && (
                        <span className="text-[10px] text-primary/80 flex items-center gap-1 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-primary animate-pulse" />
                          {n.locationName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {!n.read && (
                      <button
                        onClick={() => handleMarkAsRead(n.notificationId)}
                        title="Mark as read"
                        className="p-1.5 rounded-lg hover:bg-success/10 hover:text-success text-muted-foreground cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(n.notificationId)}
                      title="Delete notification"
                      className="p-1.5 rounded-lg hover:bg-danger/10 hover:text-danger text-muted-foreground cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border/40 rounded-3xl p-6 bg-surface-elevated/30">
          <div className="w-14 h-14 rounded-2xl bg-muted/20 flex items-center justify-center mb-4">
            <Bell className="w-7 h-7 text-muted-foreground/50" />
          </div>
          <h2 className="text-lg font-bold mb-1">All caught up!</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            You don&apos;t have any notifications at the moment. We&apos;ll alert you here when your items get scanned.
          </p>
        </div>
      )}
    </div>
  );
}
