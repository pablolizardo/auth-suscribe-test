import "@/app/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="grid gap-4  p-4">
          <nav className="flex  gap-4">
            <Link href="/">Home</Link>
            <Link href="/client">Client</Link>
            <Link href="/server">Server</Link>
            <Link href="/login">login</Link>
            <Link href="/register">register</Link>
            <Link href="/protected">protected</Link>
            <Link href="/profile">profile</Link>
            <Link href="/logout">logout</Link>
          </nav>
          <div className="grid gap-4 ">{children}</div>
        </main>
      </body>
    </html>
  );
}
