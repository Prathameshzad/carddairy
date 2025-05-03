import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthGuard>
        <Navbar/>
        {children}
        </AuthGuard>
      </body>
    </html>
  );
}
