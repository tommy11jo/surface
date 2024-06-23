import "~/styles/globals.css";
import { Header } from "./_components/Header";

export const metadata = {
  title: "Surface",
  icons: [
    {
      rel: "icon",
      url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐳</text></svg>",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center bg-lightest-sand text-base text-black sm:text-lg">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
