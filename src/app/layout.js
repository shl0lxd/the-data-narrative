import '@/globals.css';

export const metadata = {
  title: 'The Data Narrative | Mumbai Financial Ledger',
  description: 'Data-driven analysis of Indian markets and Mumbai property trends.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink font-body leading-relaxed selection:bg-gray-200">
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          {children}
        </div>
      </body>
    </html>
  );
}
