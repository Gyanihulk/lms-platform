import type { ReactNode } from "react";

import { Navbar } from "./_components/threejsTheme/components/main/navbar";
import { Footer } from "./_components/threejsTheme/components/main/footer";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#030014]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
