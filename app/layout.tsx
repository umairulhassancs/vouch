import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Vouch — Lost, But Never Gone',
    template: '%s | Vouch',
  },
  description:
    'Smart QR-based lost & found ecosystem. Protect your valuables with QR stickers and keychains. Privacy-safe recovery — no app needed.',
  keywords: [
    'lost and found',
    'QR code',
    'keychain tracker',
    'item recovery',
    'privacy',
    'Vouch',
  ],
  openGraph: {
    title: 'Vouch — Lost, But Never Gone',
    description:
      'Smart QR-based lost & found ecosystem. Protect your valuables with QR stickers and keychains.',
    url: 'https://vouch.pk',
    siteName: 'Vouch',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vouch — Lost, But Never Gone',
    description:
      'Smart QR-based lost & found ecosystem. Protect your valuables with QR stickers and keychains.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from '@/components/providers/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
