import "@/app/globals.css";
import Nav from "@/components/nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="grid gap-4 p-4">
          <Nav />
          <div className="grid gap-4 ">{children}</div>
        </main>
      </body>
    </html>
  );
}
