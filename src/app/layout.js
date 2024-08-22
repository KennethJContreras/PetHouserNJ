import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pet House",
  description: "Adopta una mascota y cambia su vida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-custom-gradient`}>
        {children}
      </body>
    </html>
  );
}
