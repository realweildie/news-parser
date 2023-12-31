import type { Metadata } from "next";
import { StoreProvider } from "@/providers/StoreProvider/StoreProvider";
import "./styles/index.scss";

export const metadata: Metadata = {
  title: "News parser",
  description: "Generated by create next app",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
