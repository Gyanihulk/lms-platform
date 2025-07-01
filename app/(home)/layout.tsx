
import Navbar from './_components/Navbar/index';
import Footer from './_components/Footer/index';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
 <>
        <Navbar />
        {children}
        <Footer />
 </>

  )
}
