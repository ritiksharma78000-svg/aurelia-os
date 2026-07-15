import './globals.css';

export const metadata = {
  title: 'Aurelia Enterprise Operating System',
  description: 'Premium Hospitality Network',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cloudflare.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
