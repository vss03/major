import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Heart Attack Prediction System',
  description: 'A ML-based system to predict heart attack risk and provide diet recommendations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
} 