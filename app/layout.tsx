import type { Metadata } from 'next';
import { Open_Sans, Share_Tech } from 'next/font/google';
import '@/styles/globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getServicePages } from '@/lib/getServicePages';
import { getIndustryPages } from '@/lib/getIndustryPages';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const shareTech = Share_Tech({
  weight: '400',
  variable: '--font-share-tech',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Managed IT & Cybersecurity for Regulated Industries | NuView',
  description:
    'Managed IT services, cybersecurity, and compliance support for healthcare, finance, and manufacturing. 24/7 SOC, CMMC, HIPAA, and NIST expertise.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch pages for navigation
  const [servicePages, industryPages] = await Promise.all([getServicePages(), getIndustryPages()]);

  return (
    <html lang="en">
      <body className={`${openSans.variable} ${shareTech.variable} antialiased`}>
        <LayoutWrapper servicePages={servicePages} industryPages={industryPages}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
