import "./styles/globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata = {
  title: "Phạm Nguyễn Hoàng Long — Software Engineer",
  description: "Portfolio cá nhân | Software Engineer | Dự án & Nghiên cứu",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Phạm Nguyễn Hoàng Long — Software Engineer",
    description: "Portfolio cá nhân | Software Engineer | Dự án & Nghiên cứu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Nguyễn Hoàng Long — Software Engineer",
    description: "Portfolio cá nhân | Software Engineer | Dự án & Nghiên cứu",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-neutral-950 text-neutral-200">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="container max-w-6xl mx-auto px-4 py-10 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
