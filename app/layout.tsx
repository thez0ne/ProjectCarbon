import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { SessionProvider } from '@/components/sessionProvider';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Project Carbon',
  description: 'an alternative chat app',
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
            {/* <ThemePanel /> */}
          </SessionProvider>
        </Theme>
      </body>
    </html>
  );
}
