
import '../../globals.css';


export const metadata = {
  title: 'The Data Narrative | Mumbai Financial Ledger',
  description: 'Data-driven analysis of Indian markets and Mumbai property trends.',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <main className="max-w-4xl mx-auto px-6 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
