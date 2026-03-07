import "./globals.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Sushi App",
  description: "COMP2068 Sushi Menu",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}