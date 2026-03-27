import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Navbar
        logoUrl={settings?.logoUrl ?? null}
        facebookUrl={settings?.facebookUrl ?? null}
        instagramUrl={settings?.instagramUrl ?? null}
      />
      <main>{children}</main>
      <Footer
        email={settings?.email ?? "robyn@robynpreston.com"}
        facebookUrl={settings?.facebookUrl ?? null}
        instagramUrl={settings?.instagramUrl ?? null}
      />
    </>
  );
}
