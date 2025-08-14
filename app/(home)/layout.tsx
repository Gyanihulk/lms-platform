
import Navbar from './_components/Navbar/index';
import Footer from './_components/Footer/index';
import "@/lib/api"; 
import { prewarmHome } from "@/lib/api"; // Import the prewarm

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  void prewarmHome;
  return (
 <>
        <Navbar />
        {children}
        <Footer />
 </>

  )
}
