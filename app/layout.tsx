import "./styles/globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Inter } from "next/font/google";
import Script from "next/script";

// Định nghĩa font chữ
const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "Phạm Nguyễn Hoàng Long — Software Engineer",
  description: "Portfolio cá nhân | Software Engineer | Dự án & Nghiên cứu",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Phạm Nguyễn Hoàng Long — Software Engineer",
    description: "Portfolio cá nhân | Software Engineer | Dự án & Nghiên cứu",
    type: "website",
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Nguyễn Hoàng Long — Software Engineer",
    description: "Portfolio cá nhân | Software Engineer | Dự án & Nghiên cứu",
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="bg-neutral-950 text-neutral-200 selection:bg-blue-500/30 selection:text-white">
        <div className="fixed inset-0 -z-10">
          {/* Background gradient effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5" />
        </div>

        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="container max-w-6xl mx-auto px-4 py-10 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
        
        {/* Scroll to top button - will be implemented with JS */}
        <div id="scroll-to-top" className="fixed bottom-6 right-6 p-2 rounded-full bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 shadow-lg cursor-pointer opacity-0 invisible transition-all duration-300 hover:bg-neutral-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </div>

        {/* Add scroll behavior script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const scrollBtn = document.getElementById('scroll-to-top');
              
              window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                  scrollBtn.classList.remove('opacity-0', 'invisible');
                  scrollBtn.classList.add('opacity-100', 'visible');
                } else {
                  scrollBtn.classList.add('opacity-0', 'invisible');
                  scrollBtn.classList.remove('opacity-100', 'visible');
                }
              });
              
              scrollBtn.addEventListener('click', function() {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              });
            });
          `
        }} />

        {/* Import custom effects script */}
        <Script src="/js/effects.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}