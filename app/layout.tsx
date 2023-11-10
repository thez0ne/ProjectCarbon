import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import '@/styles/theme-styles.css';
import { Theme } from '@radix-ui/themes';
import { SessionProvider } from '@/components/sessionProvider';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Project Carbon',
  description: 'Another Alternative Chat App',
  icons: {
    shortcut: './favicon.ico',
  },
  openGraph: {
    title: 'Project Carbon',
    description: 'Welcome to Carbon, Another Alternative Chat App',
    url: 'https://carbon.thez0ne.xyz',
    siteName: 'the_z0ne',
    images: [
      {
        url: 'https://carbon.thez0ne.xyz/carbonlogowbkg.png',
        width: 100,
        height: 100,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  generator: 'Next.js',
  applicationName: 'carbon',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'thez0ne', 'z0ne', 'the', 'socketio', 'socket.io', 'socket', 'io', 'chat', 'carbon', 'realtime', 'real-time', 'real', 'time'],
  colorScheme: 'dark',
  creator: 'Anik Patel',
  publisher: 'Anik Patel',
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://carbon.thez0ne.xyz'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang='en'>
      <body>
        <Theme appearance='dark' accentColor='amber' grayColor='slate' radius='small'>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </Theme>
      </body>
    </html>
  );
}
