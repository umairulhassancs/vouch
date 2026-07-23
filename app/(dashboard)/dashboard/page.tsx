'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package, QrCode, TrendingUp, Bell, Plus, ArrowRight,
  Shield, MapPin, Clock, HelpCircle
} from 'lucide-react';
import { useAuth, useItems, useNotifications } from '@/hooks';

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

export default function DashboardPage() {
  const { user } = useAuth();
  const { items, isLoading: itemsLoading } = useItems();
  const { notifications, isLoading: notificationsLoading } = useNotifications();
  const [greeting, setGreeting] = React.useState('Welcome');

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // Dynamic calculations
  const totalItems = items.length;
  const totalScans = items.reduce((sum, item) => sum + (item.scanCount || 0), 0);
  const lostItems = items.filter((item) => item.status === 'lost').length;
  
  const recoveryRate =
    totalItems > 0
      ? Math.round(((totalItems - lostItems) / totalItems) * 100) + '%'
      : '100%';

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const stats = [
    { label: 'Items Protected', value: itemsLoading ? '...' : String(totalItems), icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Scans', value: itemsLoading ? '...' : String(totalScans), icon: QrCode, color: 'text-teal', bg: 'bg-teal/10' },
    { label: 'Recovery Rate', value: itemsLoading ? '...' : recoveryRate, icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Notifications', value: notificationsLoading ? '...' : String(unreadNotificationsCount), icon: Bell, color: 'text-warning', bg: 'bg-warning/10' },
  ];

  // Map notifications to recent activity entries
  const recentActivity = notifications.slice(0, 5).map((n) => ({
    id: n.notificationId,
    event: n.title,
    item: n.itemLabel,
    location: n.locationName || (n.body.includes('at') ? n.body.split('at')[1]?.trim() : null),
    time: timeAgo(n.createdAt),
    type: n.type,
  }));

  // Greeting name
  const greetingName = user?.displayName ? user.displayName.split(' ')[0] : 'there';

  // Subscription slots calculation
  const planLimits: Record<string, number> = {
    free: 1,
    standard: 5,
    premium: 15,
    business: 100,
  };
  const currentPlan = user?.plan || 'free';
  const slotLimit = planLimits[currentPlan] || 1;
  const planDisplayName = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);

  return (
    <div className="max-w-5xl">
      {/* Welcome */}
      <div className="mb-6 xs:mb-8">
        <h1 className="text-xl xs:text-2xl font-bold font-[family-name:var(--font-display)] tracking-tight">
          {greeting}, {greetingName} 👋
        </h1>
        <p className="text-muted-foreground text-xs xs:text-sm mt-0.5 xs:mt-1">
          Your items are protected. Here&apos;s your overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 mb-6 xs:mb-8">
        {stats.map((s) => (
          <div key={s.label} className="p-3.5 xs:p-5 rounded-2xl bg-surface-elevated border border-border/50">
            <div className={`w-8 h-8 xs:w-10 xs:h-10 rounded-xl ${s.bg} flex items-center justify-center mb-2 xs:mb-3`}>
              <s.icon className={`w-4 h-4 xs:w-5 xs:h-5 ${s.color}`} />
            </div>
            <p className="text-lg xs:text-2xl font-bold font-[family-name:var(--font-display)]">{s.value}</p>
            <p className="text-[10px] xs:text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-surface-elevated border border-border/50 p-4 xs:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm xs:text-base">Recent Activity</h2>
            <Link href="/notifications" className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentActivity.length > 0 ? (
            <div className="space-y-3">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-2.5 py-2.5 border-b border-border/30 last:border-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    a.type === 'scan' ? 'bg-primary/10' : 'bg-teal/10'
                  }`}>
                    {a.type === 'scan' ? (
                      <QrCode className="w-4 h-4 text-primary" />
                    ) : (
                      <Shield className="w-4 h-4 text-teal" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs xs:text-sm font-medium truncate">
                        {a.event}
                      </p>
                      <span className="text-[9px] xs:text-xs text-muted-foreground flex items-center gap-1 flex-shrink-0 mt-0.5">
                        <Clock className="w-2.5 h-2.5" />{a.time}
                      </span>
                    </div>
                    {(a.item || a.location) && (
                      <p className="text-[9px] xs:text-xs text-muted-foreground mt-0.5 truncate">
                        {a.item && <span>{a.item}</span>}
                        {a.location && (
                          <span className="inline-flex items-center gap-1 ml-2">
                            <MapPin className="w-2.5 h-2.5" />{a.location}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <HelpCircle className="w-10 h-10 mb-2 opacity-30" />
              <p className="text-sm">No activity recorded yet</p>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-surface-elevated border border-border/50 p-6">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { href: '/items/activate', icon: Plus, label: 'Activate a new item', color: 'text-primary' },
                { href: '/items', icon: Package, label: 'Manage my items', color: 'text-teal' },
                { href: '/tracking', icon: MapPin, label: 'View tracking map', color: 'text-warning' },
                { href: '/subscription', icon: TrendingUp, label: 'Upgrade plan', color: 'text-success' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-overlay transition-all group"
                >
                  <div className={`w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center`}>
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Plan badge */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">{planDisplayName} Plan</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {itemsLoading ? '...' : `${totalItems} of ${slotLimit}`} item slot{slotLimit !== 1 ? 's' : ''} used
              </p>
            </div>
            {totalItems >= slotLimit && (
              <Link href="/subscription" className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold hover:bg-primary/90 transition-all">
                Upgrade
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
