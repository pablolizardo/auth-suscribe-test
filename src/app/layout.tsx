import "@/app/globals.css";
import Nav from "@/components/nav";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <main className="grid gap-4 p-4">
            <Nav />
            <div className="grid gap-4 ">{children}</div>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
