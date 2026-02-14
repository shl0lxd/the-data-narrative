import '@/globals.css';

export const metadata = {
  title: 'The Data Narrative | Mumbai Financial Ledger',
  description: 'Data-driven analysis of Indian markets and Mumbai property trends.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-body selection:bg-gray-200">
        {children}
      </body>
    </html>
  );
}
