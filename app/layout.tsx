import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

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
    <html lang="en">
      <body>
        <Theme appearance="dark" accentColor="amber" grayColor="slate" radius="small">
          {children}
        </Theme>
      </body>
    </html>
  );
}
