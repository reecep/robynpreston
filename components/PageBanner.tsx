import Image from "next/image";

type Props = {
  imageUrl: string | null;
  blockColor: string;
  title: string;
  subtitle?: string | null;
};

export default function PageBanner({ imageUrl, blockColor, title, subtitle }: Props) {
  if (imageUrl) {
    return (
      <div className="relative h-96 overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized />
      </div>
    );
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
