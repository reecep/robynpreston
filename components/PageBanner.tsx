import Image from "next/image";
import { sanityImageUrl } from "@/lib/sanity";

type Props = {
  imageUrl: string | null;
  blockColor: string;
  title: string;
  subtitle?: string | null;
  /** Set false when the page renders its own <h1> below the banner, to avoid duplicate headings. */
  showTitle?: boolean;
};

export default function PageBanner({
  imageUrl,
  blockColor,
  title,
  subtitle,
  showTitle = true,
}: Props) {
  if (imageUrl) {
    return (
      <div className="relative h-96 overflow-hidden flex items-center justify-center text-white">
        <Image
          src={sanityImageUrl(imageUrl, 1600) ?? imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        {showTitle && (
          <>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
              {subtitle && <p className="text-white/80 text-lg">{subtitle}</p>}
            </div>
          </>
        )}
      </div>
    );
  }

  if (!showTitle) {
    return <div className="h-48" style={{ backgroundColor: blockColor }} />;
  }

  return (
    <div
      className="h-48 flex items-center justify-center text-white"
      style={{ backgroundColor: blockColor }}
    >
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-white/80 text-lg">{subtitle}</p>}
      </div>
    </div>
  );
}
